import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Router } from '@angular/router';
import { SearchFlight } from './search-flight.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchedFlight: SearchFlight = new SearchFlight;
  requiredFlights: SearchFlight[] = [];
  readonly baseURL = 'http://localhost:4545/flight/';

  constructor(private http : HttpClient) { }

  getFlightList(source: string, destination: string) {
    return this.http.get(this.baseURL + `${source}/${destination}` )
  }
}
