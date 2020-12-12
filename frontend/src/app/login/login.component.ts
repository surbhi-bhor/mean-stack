import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BookService } from '../bookShared/book.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError=false;
  errorMsg1= '';
  errorMsg2= '';


 
   loginUserData = {
    email: '',
    password: ''
   }
   submitted=false;
  
  constructor(private _auth: AuthService,
              private _router: Router,
              private bookingService: BookService) { }

  ngOnInit(): void {
    
  }
  
  loginUser() {
    
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        var tokenObj = {
          token : res.token,
          userID : res.userId,
          userType: res.userType
        }
         this.bookingService.UserID= res.userId;   
         //console.log(res.userId);
         
       localStorage.setItem('token', JSON.stringify(tokenObj));
       if(res.userType== "admin"){
        this._router.navigate(['/admin']);
       }
       else{
       this._router.navigate(['/searchFlight'])
       }
      } ,    
      err =>{
       console.log(err);
       this.isLoginError=true;
       console.log(this.isLoginError);
       this.errorMsg1=err.error.errors.email;
       this.errorMsg2=err.error.errors.password;
       this.ngOnInit();              
      }

    )      
    
  }
}
