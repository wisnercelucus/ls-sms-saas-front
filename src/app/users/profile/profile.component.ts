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
  loginUserSub:Subscription;
  postList:Post[];
  
  constructor(private userService:UsersService) { }

  ngOnInit(): void {
    //this.getLogingUser()
    this.loginUserSub = this.userService.loginUser.subscribe(
      user =>{
        this.loginUser = user;
      }
      
    )
  }

  getLogingUser(){
    this.loginUserSub = this.userService.getMyProfile().subscribe(
      user=>{
        if(user){
          this.loginUser = new User(user['username'],
                          user['email'], 
                          user['image'],
                          user['is_staff'],
                          user['is_superuser'],
                          user['last_name'],
                          user['id'],
                          user['first_name']);
        }

      }
    );
}

ngOnDestroy(){
  if(this.loginUserSub){
    this.loginUserSub.unsubscribe();
  }
}

}
