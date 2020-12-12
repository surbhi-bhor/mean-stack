import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { ViewBookingService } from './viewShared/view-booking.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor ( public _authService: AuthService ){}
  
}
