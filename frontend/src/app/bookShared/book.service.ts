import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlightData } from '../adminShared/flight-data.model';


@Injectable({
  providedIn: 'root'
})
export class BookService {

   UserID= '';
   flightDetails :  FlightData[] =[];
   user= {
    email: '',
    phoneNo: '',
    name: '',
    age: ''
  }

  readonly baseURL = "http://localhost:9999/booking"

  constructor(private http: HttpClient) { }

  bookedFlight(){
    return this.flightDetails;
  }

// postBookingInfo(bookingObj: any) {
//     var boardingPass =  this.http.post(this.baseURL + `/${bookingObj.flightDetails.flightCode}/${this.UserID}`, bookingObj);
//     return boardingPass;
//    } 

  postBookingInfo(bookingObj: any) {
   var boardingPass =  this.http.post(this.baseURL + `/${bookingObj.flight.flightCode}/${this.UserID}`, bookingObj)
  // console.log(this.UserID);
  //bookingObj.id
  console.log(bookingObj);
  
   return boardingPass;
  } 


}
