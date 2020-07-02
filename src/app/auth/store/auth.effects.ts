import {Actions, ofType, Effect} from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map} from 'rxjs/operators';
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
                    return of(new AuthActions.Login({
                        username:resData['username'],
                        email:resData['email'],
                        token:resData['token']
                    }))
                }),
                catchError(
                    error=>{
                        //Error handling. Always return a non died observable.
                        return of()
                    }
                )
            )
        }
    )

    );

    constructor(private actions$:Actions, private http: HttpClient, private router:Router, private authService:AuthService){
        this.tenantUrl = 'http://fdsa.demo.local:8000';
        console.log(this.tenantUrl);
    }
}