import { Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import { Subject} from 'rxjs';
import { Router} from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, takeUntil } from 'rxjs/operators';
import * as AuthActions from '../../auth/store/auth.actions';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { NotificationModel } from 'src/app/notifications/notification.model';
import { AuthUser, User } from 'src/app/users/models/user.model';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sideNavToggle = new EventEmitter<void>();
  isAuthenticated=false;
  authenticateduser:AuthUser;
  image:string;
  instance:string;
  loginUser:User;

  /*
  userSubs: Subscription;
  loginUserSub:Subscription;
  notificationSub:Subscription;
  */
  notificationList:NotificationModel[];
  destroy$:Subject<void> = new Subject<void>();
  

  constructor(private router: Router,  
              private appService:AppService, 
              private userService:UsersService,
              private store:Store<fromApp.AppState>,
              private notificationsService:NotificationsService) { }

  timer: any;

  getUserData(username:string){   
    if(username){
      this.router.navigate(['/accounts', username])
    }
  }

  ngOnInit(): void {
      this.urlHasInstance();
      
      //this.userSubs = 
      this.store.select('auth')
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map(
          authState =>{
            return authState.authUser;
          }
        ),
      )
      .subscribe(user=>{
      this.isAuthenticated = !!user;
      if(this.isAuthenticated){
        this.authenticateduser = new AuthUser(
          user.username,
          user.email,
          user.token
        );

        this.getLogingUser();
        //this.notificationSub = 
        this.notificationsService.getUsersNotification()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          res=>{
            this.notificationList = res;
          }
        );

      }

    });
    

  }

  getLogingUser(){
      //this.loginUserSub = 
      this.userService.loginUser
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        user=>{
            this.loginUser = user;
        }
      );
  }


  onToggleSiveNav(){
    this.sideNavToggle.emit()
  }

  onLogout(){
    this.store.dispatch(new AuthActions.Logout())
  }
  
  ngOnDestroy(){
    this.destroy$.next()
    this.destroy$.complete()
  
    /*
    if (this.userSubs){
      this.userSubs.unsubscribe();
    }
    if(this.loginUserSub){
      this.loginUserSub.unsubscribe();
    }

    if(this.notificationSub){
      this.notificationSub.unsubscribe();
    }
    */

  }

  scrollTo(id:string){
    if(document.getElementById(id)){
      document.getElementById(id)
      .scrollIntoView({behavior: 'smooth'});
    }else{
      return;
    }
  }

  navigateTo(id:string, route:string){
    if (location.pathname == route){
      this.scrollTo(id)
    }else{
      this.router.navigate([route])
      .then(
        () =>{
             this.timer = setTimeout( () =>{
             this.scrollTo(id);
             clearTimeout(this.timer)
          }, 700); 
        }
      )
    } 
  }

  toPricing(){
      this.navigateTo("pricing", "/")
  }

  toAbout(){
    this.navigateTo("about", "/") 
  }
  toContact(){
    this.navigateTo("contact", "/") 
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



}
