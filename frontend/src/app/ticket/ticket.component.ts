import { Component, OnInit } from '@angular/core';
import { ViewBookingService } from '../viewShared/view-booking.service';
import * as printJS from 'print-js';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  constructor(public viewService: ViewBookingService  ) { }

  

  ngOnInit(): void {
  }

  print(){
    printJS({
       printable: 'printJS-form',
        type: 'html',
        honorColor: true,
        targetStyles: ['*']
      });
  }

}
