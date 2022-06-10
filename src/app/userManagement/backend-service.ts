import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private url = environment.baseUrl;

  public user: any;
  public userLoggedIn  = false;
  public loggedinUserInfo: any;

  constructor(private http?: HttpClient) { }

   userSignup(data: any): any {
    return this.http.post(this.url + '/shared/auth/signup', data)
   }

   checkEmail(data: any) {
    return this.http.post(this.url + '/shared/auth/checkEmail', data)
   }

   checkCode(data: any) {
    return this.http.post(this.url + '/shared/auth/verifay', data)
   }

   loginAuth(data: any) {
    return this.http.post(this.url + '/shared/auth/login', data)
  }

   updateprofile(data: any) {
    return this.http.post(this.url + '/shared/auth/updateProfile', data)
  }

  setNewpassword(data: any) {
    return this.http.post(this.url + '/shared/auth/setPassword', data)
  }

}
