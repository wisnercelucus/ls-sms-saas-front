import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subscription, Subject, throwError, BehaviorSubject } from 'rxjs';
import { Client } from './register/client.model';
import { User } from '../schools/users/user.model';
import {catchError, tap} from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  subscrition: Subscription;
  user = new BehaviorSubject<User>(null);
  instance = new Subject<string>();
  loginRedirectUrl = "";


  baseUrl = 'http://demo.local:8000/prospect/api/register/';

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, private router: Router) { }

  registerClient(client: Client){
    const body = JSON.stringify(client);
    return this.http.post(this.baseUrl, body, {headers: this.headers})
  }

  handleAutentication(username:string, email:string, token:string){
    const user = new User(
      username,
      email,
      token
    );

    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user))
  }

  getSchema(instanceName:string){
      const instance = instanceName;
      this.instance.next(instance);
  }

  login(instanceName: string, username:string, password:string, redirectUrl?:string){
    if(redirectUrl){
      this.loginRedirectUrl = redirectUrl;
    }

    if(instanceName){
     const tenant = instanceName;
     const tenantUrl = 'http://' + tenant + '.demo.local:8000/';
    const body = JSON.stringify({
          'username':username, 
          'password': password
        });

        return this.http.post(tenantUrl + 'accounts/api/token/', body, {headers: this.headers})
              .pipe(
                catchError( errorRes => this.handleError(errorRes)),
                tap(resData =>{
                  this.getSchema(tenant);
                  this.handleAutentication(resData['username'], resData['email'], resData['token'])
                  
                  if(this.loginRedirectUrl){
                    this.router.navigate([this.loginRedirectUrl])
                  }

                })
              )

    }else{
      return;
    }
  }
  
  autoLogin(){
    const userData: {
      username:string,
      email:string,
      _token:string
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData){
      return;
    }
    const loadedUser = new User(userData.username, userData.email, userData._token);

    if(loadedUser.token){
      this.user.next(loadedUser);
    }else{
      return;
    }
  }


  logout(){
    if(this.user){
      this.user.next(null);
      localStorage.removeItem('userData');
      this.router.navigate(['/auth/login']);

    }else{
      return;
    }
  }

  autoLogout(){

  }

  handleError(errorRes: HttpErrorResponse){
    let errorMessage = "An error occured";

    if(errorRes.error.message.non_field_errors[0]){
      errorMessage = errorRes.error.message.non_field_errors[0];
    }

    return throwError(errorMessage);
    
  }


}

