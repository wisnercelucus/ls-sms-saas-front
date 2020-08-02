import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { Subject } from 'rxjs';

import * as fromApp from './store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth/store/auth.actions';
import { FeedService } from './feed/feed.service';
import { NotificationsService } from './notifications/notifications.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  showLoadingSpinner = false;
  instance:string;
  tentantUrl:string;
  //subscribtion:Subscription;
  destroy$:Subject<void> = new Subject<void>();

  constructor(private router: Router, 
              private authService: AuthService,
              private appService:AppService,
              private usersService:UsersService,
              private store:Store<fromApp.AppState>,
              private feedService: FeedService,
              private notificationsService:NotificationsService) {
    this.urlHasInstance();
   
  }
  
  urlHasInstance(){
    if(window.location.hostname === this.appService.BASE_DOMAIN){
      this.instance=null;
      return false;

    }else{
      const hostName = window.location.hostname.toString();
      const hostNameParts = hostName.split(".")
      if(hostNameParts.length >= 3){
        this.instance =  hostNameParts.reverse()[2]
        return true;
      }else{
        return;
      } 
    }
  }

  ngOnInit(): void{
    this.store.dispatch(new AuthActions.AutoLogin());
    this.tentantUrl = this.appService.PROTOCOL + this.instance + "." + this.appService.BASE_DOMAIN  + ":" + this.appService.API_PORT;
    this.appService.setTenantUrl(this.tentantUrl);
    
    this.appService.instance = this.instance;

    this.authService.instance = this.instance;
    //this.subscribtion = 
    this.appService.TENANT_URL
    .pipe(takeUntil(this.destroy$))
    .subscribe(
        tenantUrl => {
          this.authService.tenantUrl = tenantUrl;
          this.usersService.tenantUrl = tenantUrl;
          this.feedService.tenantUrl = tenantUrl;
          this.notificationsService.tenantUrl = tenantUrl;
        }
    );

    this.usersService.instance = this.instance;
    
    
  }
  ngOnDestroy(){
    this.destroy$.next()
    this.destroy$.complete()
    /*
      if(this.subscribtion){
        this.subscribtion.unsubscribe()
      }
      */
  }

}
