import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { FoodapiService } from '../../services/foodapi.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss'],
  providers: [ FoodapiService ]
})
export class NavbarTopComponent implements OnInit {
	private countrySel: string;
	// Collapsed by default
	public isCollapsed = true;

	public collapsed(event: any): void {
	}

	public expanded(event: any): void {
	}

	public toggled(open: boolean): void {
	}

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private foodapiService: FoodapiService,
  ) {
  	
  }

  countryName(country: string): string {
    return this.foodapiService.countryName(country);
  }

  getCountries(): Array<string> {
    return this.foodapiService.getCountries();
  }

  ngOnInit() {
  	 // Subscribe to URI parameters
  	this.foodapiService.getParamsObs().subscribe(
  		params => {
  			console.log(params['country'], 9);
  				this.countrySel = params['country'];
  		}
  	); setTimeout( () => this.foodapiService.reloadParams(), 3000);
  	
  }
  ngAfterViewInit() {
  	
  	

  }



}
