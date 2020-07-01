import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subscription, throwError, BehaviorSubject } from 'rxjs';
import { Client } from './register/client.model';
import {catchError, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthUser } from '../users/user.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

interface AuthResponseData{
  'token':string;
  'user_id':number
  'email':string;
  'username':string;

}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  subscrition: Subscription;
  authUser = new BehaviorSubject<AuthUser>(null);
  loginRedirectUrl = "";
  instance:string;
  tenantUrl:string;
  userSubscription:Subscription;
  baseUrl = 'http://demo.local:8000/prospect/api/register/';

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, 
    private router: Router,
    private store:Store<fromApp.AppState>) { }

  registerClient(client: Client){
    const body = JSON.stringify(client);
    return this.http.post(this.baseUrl, body, {headers: this.headers})
  }

  handleAutentication(username:string, 
                      email:string, 
                      token:string,
                      ){
    const authUser = new AuthUser(
      username,
      email,
      token
    );

    this.authUser.next(authUser);
    localStorage.setItem('authUserData', JSON.stringify(authUser))
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

        return this.http.post<AuthResponseData>(this.tenantUrl + '/accounts/api/token/', body, {headers: this.headers})
              .pipe(
                catchError( errorRes => this.handleError(errorRes)),
                tap(resData =>{
                  this.handleAutentication(
                                            resData['username'], 
                                            resData['email'], 
                                            resData['token']
                                            )

                  if(this.loginRedirectUrl){
                    this.router.navigate([this.loginRedirectUrl])
                  }

                })
             )

  }
  
  autoLogin(){
    const authUserData: {
      username:string,
      email:string,
      _token:string
    } = JSON.parse(localStorage.getItem('authUserData'));

    if(!authUserData){
      return;
    }
    const loadedUser = new AuthUser(
      authUserData.username, 
      authUserData.email, 
      authUserData._token
    );

    if(loadedUser.token){
      this.authUser.next(loadedUser);
    }else{
      return;
    }
  }


  logout(){
    if(this.authUser){
      this.authUser.next(null);
      localStorage.removeItem('authUserData');
      this.router.navigate(['/auth/login']);
      if(this.userSubscription){
        this.userSubscription.unsubscribe()
      }

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
    return !!this.authUser
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

