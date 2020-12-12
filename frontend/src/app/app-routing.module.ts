import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { BookFlightComponent } from './book-flight/book-flight.component';
//import signup, login, searchFlight
import { LoginComponent } from './login/login.component';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { SignupComponent } from './signup/signup.component';
import { TicketComponent } from './ticket/ticket.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
//-----------------------------------------------------------

const routes: Routes = [
  //path for redirecting to homepage/searchFlights
  {
    path: '', redirectTo: '/searchFlight', pathMatch: 'full'
  },
  //path for homepage/searchflights
  {
    path: 'searchFlight', component: SearchFlightComponent
  },
  //path for Book Flight
  {
    path: 'bookFlight', component: BookFlightComponent
  },
   //path for view Booked Flights of a user
   {
    path: 'viewBooking', component: ViewBookingComponent, canActivate: [AuthGuard]
  },
  //path for admin
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard]
  },

  //path for login
  {
    path: 'login', component: LoginComponent
  },
  //path for signup
  {
    path: 'signup', component: SignupComponent
  },

  //path for signup
  {
    path: 'boarding', component: TicketComponent
  }
];
//-----------------------------------------------------------

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
