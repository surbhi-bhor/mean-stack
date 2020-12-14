import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { DialogLoginCheckComponent } from './dialog-login-check/dialog-login-check.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
import { TicketComponent } from './ticket/ticket.component';
//-----------------------------------------------------------


 

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    SearchFlightComponent,
    AdminComponent,
    BookFlightComponent,
    DialogLoginCheckComponent,
    ViewBookingComponent,
    TicketComponent
  ],
  entryComponents: [DialogLoginCheckComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    NgbModule ,

   
  ],
  providers: [AuthService, AuthGuard,
     ],
  bootstrap: [AppComponent]
})
export class AppModule { }
