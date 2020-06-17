import { Injectable } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  subscrition: Subscription;
  loginRedirectUrl = "";
  instance:string;
  baseDomain:string;

  tenantUrl:string;

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, 
    private router: Router, 
    private appService: AppService) { 

  }


  changePassword(oldPassword:string, newPassword:string){
    if(!this.instance){
      return;
    }
    const body = {'old_password':oldPassword, 'new_password':newPassword}
    return this.http.put(this.tenantUrl + 'accounts/api/password_change/', body, {headers:this.headers})
  }

  
  
}
