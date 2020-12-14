import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//-----------------------------------------------------------
@Injectable({
  providedIn: 'root'
})
//-----------------------------------------------------------
export class AuthService {
  private _registerUrl = "http://localhost:5555/user/signup"
  private _loginUrl = "http://localhost:5555/user/login"
  constructor(private http: HttpClient, private _router: Router) { }
//-----------------------------------------------------------
  registerUser(user: any) {
    return this.http.post<any>(this._registerUrl , user)
  }
  //----------------------------
  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl , user)
  }
  //----------------------------
  loggedIn() {
    return !!localStorage.getItem('token')
  }
  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/searchFlight'])
  }
  
  

}
