import {Actions, ofType, Effect} from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthUser } from 'src/app/users/user.model';


interface AuthResponseData{
        'token':string;
        'user_id':number
        'email':string;
        'username':string;
      
    }

const handleAuthentication = (
    username:string,
    email: string,
    token: string
    ) => {
    //const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const authUser = new AuthUser(username, email, token);
    localStorage.setItem('userData', JSON.stringify(authUser));
    return new AuthActions.Login({
        username: username,
        email: email,
        token: token
    });
    };

const handleError = (errorRes: any) => {
    let errorMessage = 'An unknown error occurred!';

    if(errorRes.error.message.non_field_errors[0]){
        errorMessage = errorRes.error.message.non_field_errors[0];
        return of(new AuthActions.LoginFail(errorMessage));
    }

    if(errorRes.error.error.message){
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
            break;
            case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist.';
            break;
            case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct.';
            break;
        }
    }

    return of(new AuthActions.LoginFail(errorMessage));
    
    };

@Injectable()
export class AuthEffects{
    tenantUrl:string;
    loginRedirectUrl:string;
    
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart)=>{
            const body= {username:authData.payload.username, password:authData.payload.password}
            return this.http.post<AuthResponseData>(this.tenantUrl + '/accounts/api/token/', 
            body, {headers: this.headers}
            ).pipe( 
                map(resData=>{
                    return handleAuthentication(
                         resData['username'],
                            resData['email'],
                            resData['token']
                    )

                }),
                catchError(
                    errorRes=>{
                        return handleError(errorRes);
                    }
                )
            )
        }
    )

    );
    
    @Effect({dispatch:false})
    authRedirect = this.actions$.pipe(ofType(AuthActions.LOGIN),
    tap(()=>{
        if(!this.authService.loginRedirectUrl){
            this.router.navigate(['/school'])
        }else{
            this.router.navigate([this.authService.loginRedirectUrl])
        }
    }
    ));

    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(
      ofType(AuthActions.LOGOUT),
      tap(() => {
        //this.authService.clearLogoutTimer();
        localStorage.removeItem('userData');
        this.router.navigate(['/auth/login']);
      })
    );

    @Effect()
    autoLogin = this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userData: {
          username: string;
          email: string;
          _token: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
          return { type: 'DUMMY' };
        }
  
        const loadedUser = new AuthUser(
          userData['username'],
          userData['email'],
          userData['_token']
        );
  
        if (loadedUser.token) {
          // this.user.next(loadedUser);
          //const expirationDuration =
            //new Date(userData._tokenExpirationDate).getTime() -
            //new Date().getTime();
          //this.authService.setLogoutTimer(expirationDuration);

          return new AuthActions.Login({
            username: loadedUser.username,
            email: loadedUser.email,
            token: loadedUser.token
          });
  
          // const expirationDuration =
          //   new Date(userData._tokenExpirationDate).getTime() -
          //   new Date().getTime();
          // this.autoLogout(expirationDuration);
        }
        return { type: 'DUMMY' };
      })
    );
  


    constructor(private actions$:Actions, private http: HttpClient, private router:Router, private authService:AuthService){
        this.tenantUrl = 'http://fdsa.demo.local:8000';
    }
}