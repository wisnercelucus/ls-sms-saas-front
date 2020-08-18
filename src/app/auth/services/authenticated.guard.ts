import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree} from "@angular/router";
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Injectable({
    providedIn:'root'
})
export class AuthenticatedGuard implements CanActivate {

    constructor(private router: Router, 
        private store:Store<fromApp.AppState>) { }



    canActivate(): boolean 
                   | Promise<boolean> 
                   | Observable<boolean | UrlTree> {
        return this.store.select('auth').pipe(
            take(1),
            map(
                authState=>{
                    return authState.authUser;
                }
            ),
            map(user =>{
                if(user){
                this.router.navigate(['/school']);
                return false;
                }else{
                    return true;
                } 
            })
        )
    }
}