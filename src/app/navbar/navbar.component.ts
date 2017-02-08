import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
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

  }

}
