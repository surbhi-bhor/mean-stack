import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlightData } from '../adminShared/flight-data.model';
import { FlightDataService } from '../adminShared/flight-data.service';



declare var M: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [FlightDataService]
})
export class AdminComponent implements OnInit {
 
  private isEdit=false;
  constructor(public flightDataService: FlightDataService) { }

  ngOnInit(): void {
    
    this.resetForm();
    this.refreshFlightList();
    this.getBookings();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.flightDataService.selectedFlight = {
      _id:'',
     flightCode:'',    
     airline: '',
     source:'',
     destination:'',
     fare: 0
    }
  }

  onSubmit(form: NgForm) {
    if(!this.isEdit){
    //if(form.value._id == ""){
    this.flightDataService.postFlight(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshFlightList();
      M.toast({ html: 'Saved successfully', classes: 'green darken-1 rounded' });
    })
  }
  else{
    this.flightDataService.putFlight(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshFlightList();
      this.isEdit=false;
      M.toast({ html: 'Updated successfully', classes: 'blue darken-1 rounded' });
    })

  }
  }

  refreshFlightList() {
    this.flightDataService.getFlightList().subscribe((res) => {
      this.flightDataService.flights = res as FlightData[];
    });
  }
  onEdit(fly: FlightData) {
    this.isEdit=true;
    this.flightDataService.selectedFlight = fly;
  }

  onDelete(flightCode: string, form: NgForm) {
    if (confirm('Are you sure to delete this flight ?') == true) {
      this.flightDataService.deleteFlight(flightCode).subscribe((res) => {
        this.refreshFlightList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully!!', classes: 'red darken-1 rounded' });
      });
    }

  }

  getBookings() {
    this.flightDataService.getBooking().subscribe(res=> {
      console.log(res);      
      return this.flightDataService.bookedFlights = res as any;      
    })
  }

}
