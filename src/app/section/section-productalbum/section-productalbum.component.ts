import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FoodapiService } from '../../services/foodapi.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {NgIf, NgFor} from '@angular/common';

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
	private products = [];

	private country: string;
	private parameters;

  private loading = true;
  private finished = false;
  private test = true;

	public showChildModal(): void {
	  this.childModal.show();
	}

	public hideChildModal(): void {
	  this.childModal.hide();
	}

  constructor(
  	private foodapiService: FoodapiService,
  	private route: ActivatedRoute,
  	private router: Router,

  ) {

  }

  ngOnInit() {
    
    this.parameters = {
      'search_terms': '',  // Product
      'tag_contains_0': 'brands',
      'tag_0': '',  // Brand
      'additives': 'with',
      'sort_by': 'unique_scans_n',
      'page': 1,
      'page_size': 12,
      'action': 'process',
      'json': 1,
    };
    // Get country for the first time
    this.country = decodeURIComponent(this.router.url).split(/\/|\?|\;/)[1];
    this.parameters.page = 1;

  	// Detect bottom of the page
  	onscroll = () => {
  		if (!this.loading && !this.finished && pageYOffset >= document.body.clientHeight - innerHeight + 80 ) {
  		  this.foodapiService.getFoodJSON(this.country, this.parameters);
  		  console.log('bottom');
  		}
  	};

  	this.products = [];

  	// Subscribe to food data changes
  	this.foodapiService.getFoodObs().subscribe(
  		data => {
        console.log(data);
  			if (!!data && data.products.length < data.count) {
  				data.products.forEach( prod => this.products.push(prod) );
  				console.log(this.products); 
          this.parameters.page++;
          this.test = false;
          setTimeout( () => this.test = true, 500);
  			}
        if (data.products.length >= data.count) {
          this.finished = true;
        }
  		}
  	);

    // Subscribe to country changes
    this.foodapiService.getCountryObs().subscribe(
      country => {
        this.country = country;
        this.parameters.page = 1;
        this.getFood();
      }
    );

    // Subscribe to loading
    this.foodapiService.watchLoading().subscribe(
      loading => this.loading = loading
    );

    this.foodapiService.getRoute();

  }

  getFood() {
    
    // // Initial Request
    // console.log(this.parameters);
    this.foodapiService.getFoodJSON(this.country, this.parameters);
  }



}
