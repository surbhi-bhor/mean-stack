import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
//--------------------------------------------------------------------------------------------------------------------------------------- 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
//--------------------------------------------------------------------------------------------------------------------------------------- 
export class SignupComponent implements OnInit {
  isSignupError=false;
  errorMsg1= '';
  registerUserData  = {
    name: '',
    age: '',
    gender: '',
    email: '',
    password: ''
  };
  submitted=false;
  constructor(private _auth: AuthService,
             private _router: Router) { }

  ngOnInit(): void {
  }
//--------------------------------------------------------------------------------------------------------------------------------------- 
  registerUser() {
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        console.log(res),      
       localStorage.setItem('token', res.token)
       this._router.navigate(['/searchFlight'])
      },
      err => {
        console.log(err);
        this.isSignupError=true;
        console.log(this.isSignupError);
        this.errorMsg1=err.error.email;
        this.ngOnInit();              
       }
       
    )      
  }

}
