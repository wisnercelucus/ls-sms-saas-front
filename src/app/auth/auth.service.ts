import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subscription, Subject, throwError, BehaviorSubject } from 'rxjs';
import { Client } from './register/client.model';
import {catchError, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../users/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  subscrition: Subscription;
  user = new BehaviorSubject<User>(null);
  loginRedirectUrl = "";
  instance:string;
  tenantUrl:string;

  baseUrl = 'http://demo.local:8000/prospect/api/register/';

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, 
    private router: Router) { }

  registerClient(client: Client){
    const body = JSON.stringify(client);
    return this.http.post(this.baseUrl, body, {headers: this.headers})
  }

  handleAutentication(username:string, 
                      email:string, 
                      token:string,
                      image:string,
                      is_staff:boolean,
                      is_superuser:boolean,
                      last_name:string,
                      user_id:number,
                      first_name:string
                      ){
    const user = new User(
      username,
      email,
      token,
      image,
      is_staff,
      is_superuser,
      last_name,
      user_id,
      first_name
    );

    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user))
  }

  login(username:string, password:string, instance?:string, redirectUrl?:string){
    if(!this.instance && instance){
      this.instance = instance;
    }
    
    if(redirectUrl){
      this.loginRedirectUrl = redirectUrl;
    }

     const body = JSON.stringify({
          'username':username, 
          'password': password
        });

        return this.http.post(this.tenantUrl + '/accounts/api/token/', body, {headers: this.headers})
              .pipe(
                catchError( errorRes => this.handleError(errorRes)),
                tap(resData =>{
                  this.handleAutentication(
                                            resData['username'], 
                                            resData['email'], 
                                            resData['token'],
                                            this.tenantUrl + resData['image'],
                                            resData['is_staff'],
                                            resData['is_superuser'],
                                            resData['last_name'],
                                            resData['user_id'],
                                            resData['first_name']
                                            )
                  
                  if(this.loginRedirectUrl){
                    this.router.navigate([this.loginRedirectUrl])
                  }

                })
             )

  }
  
  autoLogin(){
    const userData: {
      username:string,
      email:string,
      _token:string,
      image:string,
      is_staff:boolean,
      is_superuser:boolean,
      last_name:string,
      user_id:number,
      first_name:string,
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData){
      return;
    }
    const loadedUser = new User(userData.username, 
                                userData.email, 
                                userData._token,
                                userData.image,
                                userData.is_staff,
                                userData.is_superuser,
                                userData.last_name,
                                userData.user_id,
                                userData.first_name
                                );

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

  isAuthenticated(){
    return !!this.user
  }

  /*--- Reset Password ---*/

  resetPasswordRequest(email:string){
    if(this.instance){
   
    const body = JSON.stringify({'email':email});
    return this.http.post(this.tenantUrl + '/accounts/api/password_reset/', body, {headers:this.headers})

    }else{
      return;
    }

  }

  validateToken(token:string){
    if(this.instance){
      const body = JSON.stringify({'token':token});

      return this.http.post(this.tenantUrl + '/accounts/api/validate_token/', body, {headers:this.headers})

    }else{
      return;
    }
    
  }

  resetPasswordConfirm(token:string, password:string){
    if(this.instance){
     
      const body = JSON.stringify({'token': token, 'password': password});
      return this.http.post(this.tenantUrl + '/accounts/api/password_reset/confirm/', body, {headers:this.headers})

    }else{
      return;
    }
  }


}

