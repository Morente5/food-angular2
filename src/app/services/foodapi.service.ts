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
  private product: Subject<any> = new Subject<any>();

  private searching: Subject<boolean> = new Subject<boolean>();

  public countrySubject: Subject<string> = new Subject<string>();

  constructor(
    private http: Http,
    private router: Router,
  ) {

  }

  getCountries(): Array<string> {
    return Object.keys(this.countries);
  }

  countryName(country: string): string {
    return this.countries[country].name;
  }

  countryURL(country: string): string {
    console.log(country);
    return this.countries[country].baseURL;
  }

  getCountryObs(): Observable<string> {
    return this.countrySubject.asObservable();
  }

  watchLoading(): Observable<boolean> {
    return this.searching.asObservable();
  }

  getRoute() {
    // Changes in route
    this.router.events.subscribe(
      nav => {
        const tempCountry: string = decodeURIComponent(nav.url).split(/\/|\?|\;/)[1];
        console.log(tempCountry);
        this.countrySubject.next(
          (Object.keys(this.countries).indexOf(tempCountry) !== -1) ? tempCountry : 'world' );
      }  // Set country. If country is in countries, set `country`, else set `world`
    );
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
    this.searching.next(true);
    this.http.get(url)
      .subscribe( response => {
        this.foodData.next(response.json());
        this.searching.next(false);
        } );

  }

  getFoodObs(): Observable<any> {
    return this.foodData.asObservable();
  }

  getProductJSON(barcode) {
    this.http.get(`http://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
      .subscribe( response => this.product.next(response.json()) );
      console.log(response.json());
  }

  getProductObs(): Observable<any> {
    return this.product.asObservable();
  }


}
