import { Component } from '@angular/core';
import { Ng2BreadcrumbModule, BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
  	BreadcrumbService
  ]
})
export class AppComponent {
  notfound = false;
  constructor(
  	private breadcrumbService: BreadcrumbService
  ) {
  	breadcrumbService.addFriendlyNameForRoute('/world', 'World');
  	breadcrumbService.addFriendlyNameForRoute('/usa', 'USA');
  	breadcrumbService.addFriendlyNameForRoute('/uk', 'UK');
  	breadcrumbService.addFriendlyNameForRoute('/spain', 'Spain');
  	breadcrumbService.addFriendlyNameForRoute('/france', 'France');
  	breadcrumbService.addFriendlyNameForRoute('/germany', 'Germany');
  }

}
