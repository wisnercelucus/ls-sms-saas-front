import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
                boolean 
                | Promise<boolean> 
                | Observable<boolean | UrlTree>
                {
        return this.authService.user.pipe(
            take(1),
            map(user => {
                const isAuthenticated = !!user;
                if(isAuthenticated){
                    return true;
                }else{

                    const previousUrl = state.url;
                    if(previousUrl.includes("password-reset")){
                        return this.router.createUrlTree([previousUrl]);
                    }
                    console.log(previousUrl);
                    this.authService.loginRedirectUrl = previousUrl;

                    return this.router.createUrlTree(['/auth/login']); 
                }
            })
        )
    }
    
} 

