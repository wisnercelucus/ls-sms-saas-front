import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { Client } from '../register/client.model';
import { AuthUser } from 'src/app/users/models/user.model';

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
  loginRedirectUrl = "";
  instance:string;
  tenantUrl:string;
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

    this.store.dispatch(new AuthActions.Login(
      {username:username, email:email,token:token, redirect:true}
    ))
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
      this.store.dispatch(
        new AuthActions.Login({username:loadedUser.username, email:loadedUser.email, token: loadedUser.token, redirect: false}
        )
      )
    }else{
      return;
    }
  }


  logout(){   
      this.store.dispatch(new AuthActions.Logout())
      localStorage.removeItem('authUserData');
      this.router.navigate(['/auth/login']);
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

