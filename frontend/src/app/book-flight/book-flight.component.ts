import { NgZone } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BookService } from '../bookShared/book.service';
import { WindowRefService } from '../window-ref.service';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {
  
  public rzp: any;
  

  user= {
    email: '',
    phoneNo: '',
    name: '',
    age: ''
  }
   constructor(public bookService: BookService,
               public _authService: AuthService,
               private _router: Router,
               private zone: NgZone,
               private winRef:WindowRefService) { }

  ngOnInit(): void {
  }
//post booking
onBook() {   
    var user = this.user;
    console.log(user);
    var flight = this.bookService.flightDetails[0];
    console.log(flight);  

    let bookingObj = {
      flight,
      id: this.bookService.UserID,
      user
    }
    console.log(this.bookService.UserID);
    

    this.bookService.postBookingInfo(bookingObj).subscribe(
      res => {
        console.log(res);
        this._router.navigate(['/viewBooking']);
      },
      err => {
        console.log(err);
      })
     
  }


//payment method
payWithRazor(){ 
    let options:any = {
        "key": "rzp_test_f8l1J9ZW32tWIG",
        "amount": this.bookService.flightDetails[0].fare*100,
        "name": "Fly High",
        "description": "Flight booking payment gateway",
        "modal": {
          escape: false,
        }, 
        "theme": {
          "color": "#420D13"
        }
      };
      options.handler = ((response:any) => {
          console.log(response);
          this.zone.run(() => {
            // add API call here
            this.onBook();
          });
      });
      options.modal.ondismiss = ((response:any) => {
          console.log(response);
      });
      let rzp = new this.winRef.nativeWindow.Razorpay(options);
      rzp.open();
  } 


// view() {
//   this._router.navigate(['/viewBooking'])
// }
}
