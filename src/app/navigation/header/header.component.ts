import { Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import { Subscription, Observable} from 'rxjs';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User, AuthUser } from 'src/app/users/user.model';
import { AppService } from 'src/app/app.service';
import { UsersService } from 'src/app/users/users.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';
import * as AuthActions from '../../auth/store/auth.actions';
import { FeedService } from 'src/app/feed/feed.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { NotificationModel } from 'src/app/notifications/notification.model';

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

  userSubs: Subscription;
  loginUserSub:Subscription;
  testUserSub:Subscription;
  Logsubsciption:Subscription;
  notificationList:NotificationModel[];
  notificationSub:Subscription;


  constructor(private router: Router, 
              private authService: AuthService, 
              private appService:AppService, 
              private userService:UsersService,
              private store:Store<fromApp.AppState>,
              private feedService:FeedService,
              private notificationsService:NotificationsService) { }

  timer: any;

  getUserData(username:string){   
    if(username){
      this.router.navigate(['/accounts', username])
    }
  }

  ngOnInit(): void {
      this.urlHasInstance();
      
      this.userSubs = this.store.select('auth').pipe(
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

        this.Logsubsciption = this.userService.getMyProfile().subscribe(
          res=>{
          }
        );

        this.notificationSub = this.notificationsService.getUsersNotification()
        .subscribe(
          res=>{
            this.notificationList = res;
          }
        );

      }

    });
    
    this.testUserSub = this.userService.loginUser.subscribe(
      user=>{
        this.loginUser = user;
      }
    )

  }

  getLogingUser(){
      this.loginUserSub = this.userService.getMyProfile().subscribe(
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
    if (this.userSubs){
      this.userSubs.unsubscribe();
    }
    if(this.loginUserSub){
      this.loginUserSub.unsubscribe();
    }

    if(this.testUserSub){
      this.testUserSub.unsubscribe();
    }
    if(this.Logsubsciption){
      this.Logsubsciption.unsubscribe();
    }
    if(this.notificationSub){
      this.notificationSub.unsubscribe();
    }

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
