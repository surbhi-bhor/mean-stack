import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { FlightData } from './flight-data.model';

@Injectable({
  providedIn: 'root'
})
export class FlightDataService {
  selectedFlight: FlightData = new FlightData;
  flights: FlightData[] = [];

  bookedFlights: any[] = [];
  readonly baseURL = 'http://localhost:7777/admin/flight';
  readonly bookURL = 'http://localhost:9999/bookings';

  constructor(private http : HttpClient ) { }

  postFlight(fly : FlightData){
    return this.http.post(this.baseURL, fly)
  }

  getFlightList() {
    return this.http.get(this.baseURL)
  }

  putFlight(fly: FlightData) {
    return this.http.put(this.baseURL + `/${fly._id}`, fly);
  }

  deleteFlight(flightCode: string) {
    return this.http.delete(this.baseURL + `/${flightCode}`);
  }

  getBooking() {
    return this.http.get(this.bookURL)
  }
}
