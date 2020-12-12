import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightData } from '../adminShared/flight-data.model';
import { FlightDataService } from '../adminShared/flight-data.service';
import { AuthService } from '../auth.service';
import { BookService } from '../bookShared/book.service';
import { DialogLoginCheckComponent } from '../dialog-login-check/dialog-login-check.component';
import { SearchFlight } from '../searchShared/search-flight.model';
import { SearchService } from '../searchShared/search.service';
import {MatDialog} from '@angular/material/dialog';

declare var M: any;
@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {
  noFlight= false;
  isSearchError = false;  
  dest: any;
  src: any;  
      onSwap(src: string,dest: string){
        this.dest=src;
        this.src=dest;
      }

  constructor(public searchService: SearchService,
              public flightDataService: FlightDataService, 
              public _authService: AuthService,
              public bookService: BookService,
              private _router: Router,
              public dialog: MatDialog ) { }


  ngOnInit( ): void {
      this.refreshFlightList();
  }
  
  onSubmit(source: string, destination: string) {
    if(source === destination){   
      this.isSearchError = true;
      M.toast({ html: 'Source and destination cannot be same!!', classes: 'black darken-1 rounded' });
    }
    this.searchService.getFlightList(source, destination).subscribe((res) => {  
      console.log(res);                  
      this.searchService.requiredFlights = res as SearchFlight[];      
      //  if(res= [] ){
      //    this.noFlight= true ;    
      //   M.toast({ html: 'Sorry no Flights available for this route!', classes: 'black darken-1 rounded' });
      // } 
    });    
    }      
  // onSubmit(source: string, destination: string) {
  //   this.searchService.getFlightList(source, destination).subscribe((res) => {
  //     this.searchService.requiredFlights = res as SearchFlight[];
  //   });
  //   }

     refreshFlightList() {
    this.flightDataService.getFlightList().subscribe((res) => {
      this.searchService.requiredFlights = res as SearchFlight[];
    });
  }

  bookFlight(f: FlightData){
    if(this._authService.loggedIn()) {
        this.bookService.flightDetails.push(f);
        this._router.navigate(['/bookFlight']);
    }
    else{
      //dialog box which will have login signup links
      this.dialog.open(DialogLoginCheckComponent,{
        width: '400px',
        panelClass: 'login-dialog-container',
        position: {top: "10px"}
      });
    }
  }

    
}
