import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss']
})
export class NavbarTopComponent implements OnInit {
	private countrySel;
	// Collapsed by default
	public isCollapsed = true;

	public collapsed(event: any): void {
	  console.log(event);
	}

	public expanded(event: any): void {
	  console.log(event);
	}

	public toggled(open: boolean): void {
	  console.log('Dropdown is now: ', open);
	}

  constructor() { }

  ngOnInit() {
  	//countrySel
  }

}
