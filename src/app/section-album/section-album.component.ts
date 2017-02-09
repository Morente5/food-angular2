import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-album',
  templateUrl: './section-album.component.html',
  styleUrls: ['./section-album.component.scss']
})
export class SectionAlbumComponent implements OnInit {

	public list;
  constructor() { }

  ngOnInit() {
  	this.list = [1,1,1,1,1,1,1,1,1];
  }

}
