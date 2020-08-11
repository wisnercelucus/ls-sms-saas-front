import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders} from '@angular/common/http'
import { exhaustMap, take, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private store:Store<fromApp.AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
        take(1),
        map(
            authState=>{
              return authState.authUser;
            }
        ),
        exhaustMap(user => {
          if(!user){
            return next.handle(req);
          }
          const modifiedReq = req.clone({headers: new HttpHeaders().set('Authorization', 'Token '+ user.token)});
          return next.handle(modifiedReq);
        }));
  }

  
}
