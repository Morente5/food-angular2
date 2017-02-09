import { Component, OnInit } from '@angular/core';
import { FoodapiService} from '../../services/foodapi.service';

@Component({
  selector: 'app-section-productalbum',
  templateUrl: './section-productalbum.component.html',
  styleUrls: ['./section-productalbum.component.scss']
})
export class SectionProductalbumComponent implements OnInit {

	public list;
  constructor() { }

  ngOnInit() {
  	this.list = [1, 1, 1, 1, 1, 1, 1, 1, 1];  // TEST
  }

}
