import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router, private store:Store<fromApp.AppState>){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
                boolean 
                | Promise<boolean> 
                | Observable<boolean | UrlTree>
                {
        return this.store.select('auth').pipe(
            take(1),
            map(
                authState =>{
                    return authState.authUser;
                }
            ),
            map(user => {
                const isAuthenticated = !!user;
                if(isAuthenticated){
                    return true;
                }else{
                    const previousUrl = state.url;
                    this.authService.loginRedirectUrl = previousUrl;
                    return this.router.createUrlTree(['/auth/login']); 
                }
            })
        )
    }
    
} 

