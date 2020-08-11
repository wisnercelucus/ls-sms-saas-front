import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UsersService } from './users.service';
import { take } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class LoginUserResolverService implements Resolve<User>{
    constructor(private usersService:UsersService

        ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
        return this.usersService.getMyProfile().pipe(take(1));
    }
    

}