import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from './auth.service';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class AuthenticatedGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean 
                   | Promise<boolean> 
                   | Observable<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1),
            map(user =>{
                if(user){
                this.router.navigate(['/school/feed']);
                return false;
                }else{
                    return true;
                } 
            })
        )
    }
}