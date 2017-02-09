import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FoodapiService {

	private countryBasedURL: Object = {
		'World': 'https://world.openfoodfacts.org/cgi/',
  	'USA': 'https://us.openfoodfacts.org/cgi/',
  	'UK': 'https://uk.openfoodfacts.org/cgi/',
  	'Spain': 'https://es.openfoodfacts.org/cgi/',
  	'Germany': 'https://de.openfoodfacts.org/cgi/',
  	'France': 'https://fr.openfoodfacts.org/cgi/'
	};
	private foodData: Subject<any> = new Subject<any>();

  constructor(private http: Http) {
  	this.getFoodJSON();
  }

  getCurrentCountry(): string {
  	// TODO return sth;
  }

  getURIparams(parameters: Object): string {
  	return Object.keys(parameters).map( key => {
    	return encodeURIComponent(key) + '=' + encodeURIComponent(parameters[key]);
    	} ).join('&');
  }

  getFoodJSON(country: string, parameters: Object): void {
  	let url = this.countryBasedURL[this.getCurrentCountry()] + this.getURIparams(parameters);
		this.ajax.get(url)
			.subscribe( response => {this.foodData.next(response); console.log(this.foodData)});
  }

}
