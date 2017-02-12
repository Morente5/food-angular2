import { Component } from '@angular/core';
import { Ng2BreadcrumbModule, BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';
import { FoodapiService } from './services/foodapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
  	FoodapiService,
  	BreadcrumbService
  ]
})
export class AppComponent {
  notfound = false;
  private product;
  constructor(
  	private breadcrumbService: BreadcrumbService,
  	private foodapiService: FoodapiService,
  ) {
  	breadcrumbService.addFriendlyNameForRoute('/world', 'World');
  	breadcrumbService.addFriendlyNameForRoute('/usa', 'USA');
  	breadcrumbService.addFriendlyNameForRoute('/uk', 'UK');
  	breadcrumbService.addFriendlyNameForRoute('/spain', 'Spain');
  	breadcrumbService.addFriendlyNameForRoute('/france', 'France');
  	breadcrumbService.addFriendlyNameForRoute('/germany', 'Germany');
  	breadcrumbService.addFriendlyNameForRoute('/product', 'Product');
  	
  	foodapiService.getProductObs().subscribe(
  	  product => this.product = product
  	);
  }


}
