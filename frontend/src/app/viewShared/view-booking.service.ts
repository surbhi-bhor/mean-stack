import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BookService } from '../bookShared/book.service';




@Injectable({
  providedIn: 'root'
})
export class ViewBookingService {
bookedFlights: any[] = [];
registeredUser: any[] = [];

ticket: any =[];
  
   readonly baseURL = 'http://localhost:9999/booked/allbookings';
   readonly userURL = 'http://localhost:5555/user';
   readonly deleteURL = 'http://localhost:9999/booking/cancel';

   constructor(private http : HttpClient, public bookService: BookService, private router: Router ) { }

    
     // get flights booked by user
     getUser() {
      return this.http.get(this.baseURL + `/${this.bookService.UserID}`)
    }

     // get user by its id
    getRegistered() {
       return this.http.get(this.userURL + `/${this.bookService.UserID}`)
     }

    // cancel booking
    cancelBooking(BookingID: string) {
      return this.http.delete(this.deleteURL + `/${BookingID}`);
    }

    checkIn(ticket: any){
      this.ticket = ticket;
      this.router.navigate(['/boarding']);
    }
    
}
