import { Component, OnInit } from '@angular/core';
import { ViewBookingService } from '../viewShared/view-booking.service';

declare var M: any;

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {

 isBooked = false;
  
  constructor(public viewService: ViewBookingService) { }
  
  ngOnInit(): void {
    this.getUserbyUserId() ,
    this.getRegUserbyId()
  }
  
  //get flights booked by user
  getUserbyUserId() {
    this.viewService.getUser().subscribe(res=> {
      console.log(res);      
      return this.viewService.bookedFlights = res as any;    
      
    })  
    
  }

// display user 
  getRegUserbyId() {
    this.viewService.getRegistered().subscribe(res=> {
      console.log(res);      
      return this.viewService.registeredUser = res as any;      
    })
  }

  onDelete(BookingID: string) {
      this.viewService.cancelBooking(BookingID).subscribe((res) => {
        this.getUserbyUserId();        
        M.toast({ html: 'Cancelled successfully!!', classes: 'red darken-1 rounded' });
      });
  
  }    

  
  
}


