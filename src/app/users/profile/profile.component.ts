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
import { Subscription } from 'rxjs';
import { Post } from 'src/app/feed/post.model';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AppService } from 'src/app/app.service';

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

  loginUserSub:Subscription;
  userProfileSub:Subscription;
  appServiceSub:Subscription;

  username:string;
  postList:Post[];
  tenantUrl:string;
  
  
  constructor(private userService:UsersService, private appService:AppService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean => {
      return false;
     };

     this.appServiceSub = this.appService.TENANT_URL.subscribe(url=>{
        this.tenantUrl = url;
     })


    this.username = this.route.snapshot.params['username'];
    

    this.userProfileSub = this.userService.getProfile(this.username).subscribe(
      user=>{
        this.user = user;
      }
    );

    this.getLogingUser()
  }

  getLogingUser(){
    this.loginUserSub = this.userService.loginUser.subscribe(
          user=>{
            this.loginUser = user;
          }
       );
    }

ngOnDestroy(){
  this.loginUserSub.unsubscribe();
  
  this.userProfileSub.unsubscribe()
  
  this.appServiceSub.unsubscribe()
  
}

}
