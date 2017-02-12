import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng2BreadcrumbModule, BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';


@Component({
  selector: 'app-navbar-breadcrumbs',
  templateUrl: './navbar-breadcrumbs.component.html',
  styleUrls: ['./navbar-breadcrumbs.component.scss'],
  providers: [
  	BreadcrumbService
  ]
})
export class NavbarBreadcrumbsComponent implements OnInit {

	private path;

  constructor(
  	private router: Router,
  	private breadcrumbService: BreadcrumbService
  ) {
  	breadcrumbService.addFriendlyNameForRoute('/world', 'World');
		breadcrumbService.addFriendlyNameForRoute('/usa', 'USA');
  	breadcrumbService.addFriendlyNameForRoute('/uk', 'UK');
		breadcrumbService.addFriendlyNameForRoute('/spain', 'Spain');
  	breadcrumbService.addFriendlyNameForRoute('/france', 'France');
		breadcrumbService.addFriendlyNameForRoute('/germany', 'Germany');
  }

  ngOnInit() {

  }

}
