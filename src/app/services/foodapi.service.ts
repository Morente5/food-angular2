import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable()
export class FoodapiService {

  private countries = {
    'world': {name: 'World', baseURL: 'https://world.openfoodfacts.org/cgi/search.pl?'},
    'usa': {name: 'USA', baseURL: 'https://us.openfoodfacts.org/cgi/search.pl?'},
    'uk': {name: 'UK', baseURL: 'https://uk.openfoodfacts.org/cgi/search.pl?'},
    'spain': {name: 'Spain', baseURL: 'https://es.openfoodfacts.org/cgi/search.pl?'},
    'germany': {name: 'Germany', baseURL: 'https://de.openfoodfacts.org/cgi/search.pl?'},
    'france': {name: 'France', baseURL: 'https://fr.openfoodfacts.org/cgi/search.pl?'},
  };

	private foodData: Subject<any> = new Subject<any>();

  private searching = false;

  public countrySubject: Subject<string> = new Subject<string>();

  constructor(
    private http: Http,
    private router: Router,
  ) {
    // Changes in route
    router.events.subscribe(
      nav => {
        const tempCountry: string = nav.url.split('/')[1];
        this.countrySubject.next(
          (Object.keys(this.countries).indexOf(tempCountry) !== -1) ? tempCountry : 'world' );
      }  // Set country. If country is in countries, set `country`, else set `world`
    );

  }

  getCountries(): Array<string> {
    return Object.keys(this.countries);
  }

  countryName(country: string): string {
    return this.countries[country].name;
  }

  countryURL(country: string): string {
    return this.countries[country].baseURL;
  }



  getCountryObs(): Observable<string> {
    return this.countrySubject.asObservable();
  }

  getURIparams(params: Object): string {
    // Transforms JSON object into URI parameters
  	return Object.keys(params).map( key => {
    	return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    	} ).join('&');
  }

  getFoodJSON(country, parameters) {
    // AJAX Request
    let url: string = this.countryURL(country) + this.getURIparams(parameters);
    this.searching = true;
    this.http.get(url)
      .subscribe( response => {
        this.foodData.next(response.json());
        this.searching = false;
        } );

  }

  getFoodObs(): Observable<any> {
    return this.foodData.asObservable();
  }


}
