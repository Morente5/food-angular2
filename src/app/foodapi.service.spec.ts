/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FoodapiService } from './foodapi.service';

describe('FoodapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoodapiService]
    });
  });

  it('should ...', inject([FoodapiService], (service: FoodapiService) => {
    expect(service).toBeTruthy();
  }));
});
