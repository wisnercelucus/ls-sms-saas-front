import { Injectable } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { User } from './user.model';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  subscrition: Subscription;

  loginRedirectUrl:string;
  instance:string;
  baseDomain:string;
  tenantUrl:string;
  
  loginUser = new BehaviorSubject<User>(null);

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, 
    private router: Router, 
    private appService: AppService, private authService:AuthService) { 

  }

  getMyProfile(){
    if(!this.instance){
      return;
    }

    return this.http.get(this.tenantUrl + '/accounts/api/me/', {headers:this.headers}).pipe(
      tap(resData =>{
        const user = new User(
          resData['username'], 
          resData['email'], 
          resData['image'],
          resData['is_staff'],
          resData['is_superuser'],
          resData['last_name'],
          resData['id'],
          resData['first_name']
          )
        this.loginUser.next(user)

      },
        (err:HttpErrorResponse)=> {
          if(err.error.detail == "Token has expired"){
            this.authService.logout()
          }
        }
      )
   )
  }

  changePassword(oldPassword:string, newPassword:string){
    if(!this.instance){
      return;
    }
    const body = {'old_password':oldPassword, 'new_password':newPassword}
    return this.http.put(this.tenantUrl + '/accounts/api/password_change/', body, {headers:this.headers})
  }

  
}
