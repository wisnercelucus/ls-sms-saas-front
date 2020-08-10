import { Component, OnInit, OnDestroy } from '@angular/core';
import { faBirthdayCake, 
          faMapMarker, 
          faThumbsUp, 
          faShareAltSquare, 
          faComment, 
          faHeart,
         faSmile , 
         faUserCircle, faUsers, faHome, faUser} from '@fortawesome/free-solid-svg-icons';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { Subject } from 'rxjs';
import { Post } from 'src/app/feed/models/post.model';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  faBirthdayCake = faBirthdayCake;
  faMapMarker = faMapMarker;
  faThumbsUp = faThumbsUp;
  faShareAltSquare = faShareAltSquare;
  faComment = faComment;
  faHeart = faHeart;
  faSmile = faSmile;
  faUserCircle = faUserCircle;
  faUsers = faUsers;
  faHome = faHome;
  faUser = faUser;
  
  loginUser:User;
  user:User;
  /*
  loginUserSub:Subscription;
  userProfileSub:Subscription;
  appServiceSub:Subscription;
  */
  username:string;
  postList:Post[];
  tenantUrl:string;
  destroy$:Subject<void> = new Subject<void>();
  
  constructor(private userService:UsersService, private appService:AppService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean => {
      return false;
     };

     //this.appServiceSub = 
     this.appService.TENANT_URL
     .pipe(takeUntil(this.destroy$))
     .subscribe(url=>{
        this.tenantUrl = url;
     })


    this.username = this.route.snapshot.params['username'];
    

    //this.userProfileSub = 
    this.userService.getProfile(this.username)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      user=>{
        this.user = user;
      }
    );

    this.getLogingUser()
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

ngOnDestroy(){
  this.destroy$.next()
  this.destroy$.complete()
  /*
  if(this.loginUserSub){
    this.loginUserSub.unsubscribe();
  }
  
  if(this.userProfileSub){
    this.userProfileSub.unsubscribe()
  }
  
  if(this.appServiceSub){
    this.appServiceSub.unsubscribe()
  }*/

}

}
