import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-section-notfound',
  templateUrl: './section-notfound.component.html',
  styleUrls: ['./section-notfound.component.scss']
})
export class SectionNotfoundComponent implements OnInit {

  constructor(
  	private location: Location
  ) {

  }

    cancel() {
      this.location.back();

  ngOnInit() {
  }

}
