import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subscription, Subject, throwError } from 'rxjs';
import { Client } from './register/client.model';
import { User } from '../schools/users/user.model';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  subscrition: Subscription;
  user = new Subject<User>();


  baseUrl = 'http://demo.local:8000/prospect/api/register/';

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  registerClient(client: Client){
    const body = JSON.stringify(client);
    return this.http.post(this.baseUrl, body, {headers: this.headers})
  }

  handleAutentication(username:string, email:string, password: string, token:string){
    const user = new User(
      email,
      password,
      token
    );

    this.user.next(user);
  }


  login(instanceName: string, username:string, password:string){
    if(instanceName){
     const tenant = instanceName;
     const tenantUrl = 'http://' + tenant + '.demo.local:8000/';
      const body = JSON.stringify(
        {
          'username':username, 
          'password': password
        });
        return this.http.post(tenantUrl + 'accounts/api/token/', body, {headers: this.headers})
        .pipe(
          catchError( errorRes => this.handleError(errorRes)),
          tap(resData =>{
            this.handleAutentication(resData['username'], resData['email'], resData['password'], resData['token'])
          })
        )

    }else{
      return;
    }
  }

  handleError(errorRes:HttpErrorResponse){
    let errorMessage = "An error occured";
    console.log(errorRes)
    if(!errorRes.error || !errorRes.error.error.message){
      return throwError(errorMessage);
    }

    errorMessage = errorRes.error.error.message;
    return throwError(errorMessage);
    
  }


}

