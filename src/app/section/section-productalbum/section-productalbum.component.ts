import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { FoodapiService } from '../../services/foodapi.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
  selector: 'app-section-productalbum',
  templateUrl: './section-productalbum.component.html',
  styleUrls: ['./section-productalbum.component.scss'],
  providers: [ FoodapiService ]
})
export class SectionProductalbumComponent implements OnInit, OnDestroy {
	@ViewChild('childModal') public childModal: ModalDirective;

	private foodData;
	private products: Array<any>;
	private page: number;

	private country: string;
	private parameters;

	private scrollable = true;

	private queryParamaterValue: string;
	private matrixParameterValue: string;
	private querySub: any;
	private matrixSub: any;

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

  ngOnInit() {

  	// Detect bottom of the page
  	onscroll = () => {
  		if (pageYOffset >= document.body.clientHeight - innerHeight + 80 ) {
  		  this.scrollable = false;
  		  //this.foodapiService.getFoodJSON(this.countrySel, )
  		  console.log('hey');
  		}
  	};

  	this.route.params.subscribe(matrixParams => {
  	  this.matrixParameterValue = matrixParams['matrixParameterName'];
  	  console.log(this.matrixParameterValue);
  	}
  	);

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

  ngOnDestroy() {
      if (this.querySub) {
        this.querySub.unsubscribe();
      }
      if (this.matrixSub) {
        this.matrixSub.unsubscribe();
      }
    }

}
