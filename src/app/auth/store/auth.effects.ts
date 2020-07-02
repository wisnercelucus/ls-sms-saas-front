import {Actions, ofType, Effect} from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';


interface AuthResponseData{
        'token':string;
        'user_id':number
        'email':string;
        'username':string;
      
    }

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
                    return new AuthActions.Login({
                        username:resData['username'],
                        email:resData['email'],
                        token:resData['token']
                    })
                }),
                catchError(
                    errorRes=>{
                        let errorMessage = "An error occured";
                        console.log(errorRes);
                        if(errorRes.error.message.non_field_errors[0]){
                          errorMessage = errorRes.error.message.non_field_errors[0];
                          return of(new AuthActions.LoginFail(errorMessage));
                        }
                    
                        return of(new AuthActions.LoginFail(errorMessage))
                    }
                )
            )
        }
    )

    );
    
    @Effect({dispatch:false})
    authSuccess = this.actions$.pipe(ofType(AuthActions.LOGIN),
    tap(()=>{
        if(!this.authService.loginRedirectUrl){
            this.router.navigate(['/school'])
        }else{
            this.router.navigate([this.authService.loginRedirectUrl])
        }
    }
    ));

    constructor(private actions$:Actions, private http: HttpClient, private router:Router, private authService:AuthService){
        this.tenantUrl = 'http://fdsa.demo.local:8000';
        console.log(this.tenantUrl);
    }
}