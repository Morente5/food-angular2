import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FoodapiService } from '../../services/foodapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
  selector: 'app-section-productalbum',
  templateUrl: './section-productalbum.component.html',
  styleUrls: ['./section-productalbum.component.scss'],
  providers: [ FoodapiService ]
})
export class SectionProductalbumComponent implements OnInit {
	@ViewChild('childModal') public childModal: ModalDirective;

	private foodData;
	private products: Array<any>;
	private page: number;

	private country: string;
	private parameters;

	private scrollable = true;


	public showChildModal(): void {
	  this.childModal.show();
	}

	public hideChildModal(): void {
	  this.childModal.hide();
	}

  constructor(
  	private foodapiService: FoodapiService,
  	private route: ActivatedRoute,
  	private router: Router
  ) {

  }

  countryName(country: string): string {
    return this.foodapiService.countryName(country);
  }

  getCountries(): Array<string> {
    return this.foodapiService.getCountries();
  }

  ngOnInit() {

  	// Detect bottom of the page
  	onscroll = () => {
  		if (pageYOffset >= document.body.clientHeight - innerHeight + 80 ) {
  		  this.scrollable = false;
  		  //this.foodapiService.getFoodJSON(this.countrySel, )
  		  console.log('hey');
  		}
  	};

  	this.products = new Array();
  	// Subscribe to food data changes
  	this.foodapiService.getFoodObs().subscribe(
  		data => {
  			if (data) {
  				this.foodData = data;
  				this.products.concat(this.foodData.products);
  				console.log(this.foodData); 
  			}
  		}
  	);

  	// Subscribe to country changes
  	this.foodapiService.getCountryObs().subscribe(
  		country => this.country = country
  	);

  	this.parameters = {
  		'search_terms': '',  // Product
  		'tag_contains_0': 'brands',
  		'tag_0': '',  // Brand
  		'tag_contains_1': 'brands',
  		'tag_1': '',  // Brand
  		'additives': 'with',
  		'sort_by': 'unique_scans_n',
  		'page': 1,
  		'page_size': 12,
  		'action': 'process',
  		'json': 1,
		};

		// Get country for the first time
		this.country = this.router.url.split('/')[1];
		// Initial Request
		console.log(this.parameters);
  	this.foodapiService.getFoodJSON(this.country, this.parameters);

  }

}
