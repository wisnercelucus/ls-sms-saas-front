import { Component, OnInit, OnDestroy } from '@angular/core';
import { faBirthdayCake, 
  faMapMarker, 
  faThumbsUp, 
  faShareAltSquare, 
  faComment, 
  faHeart,
 faSmile , 
 faUserCircle, faUsers, faHome, faUser} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PublishModalFormComponent } from '../publish-modal-form/publish-modal-form.component';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/users/users.service';
import { User } from 'src/app/users/user.model';

@Component({
  selector: 'app-feed-side-menu',
  templateUrl: './feed-side-menu.component.html',
  styleUrls: ['./feed-side-menu.component.css']
})
export class FeedSideMenuComponent implements OnInit, OnDestroy {
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
 
  constructor(private router:Router,
    public dialog: MatDialog, private userService:UsersService
    ) { }

  ngOnInit(): void {
    this.userService.loginUser.subscribe(
      user=>{
        this.loginUser = user;
      }
    )
  }

  ngAfterViewInit(){
      if(!this.loginUser){
        this.getLogingUser()
      }
  }

  getLogingUser(){
      this.loginUserSub = this.userService.loginUser.subscribe (
        user=>{
            this.loginUser = user;
        }
      );
  }


  ngOnDestroy(){
    if(this.loginUserSub){
      this.loginUserSub.unsubscribe()
    }
  }
  
  navigateTo(path:string){
    this.router.navigate([path])
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PublishModalFormComponent, {
      width: '500px',
      data:{
        post:null,
        editMode_:false
      }
    });
  }
}
