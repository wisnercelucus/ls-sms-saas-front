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
  
  subscrition:Subscription;
  loginUser:User;
  loginUserSub:Subscription;

  constructor(private router:Router,
    public dialog: MatDialog, private userService:UsersService
    ) { }

  ngOnInit(): void {
    this.getLogingUser();
  }

  ngAfterViewInit(){
      
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
            console.log(this.loginUser)
          }

        }
      );
  }


  ngOnDestroy(){
    if(this.subscrition){
      this.subscrition.unsubscribe()
    }
  }
  
  navigateTo(path:string){
    this.router.navigate([path])
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PublishModalFormComponent, {
      width: '500px',
    });

    this.subscrition = dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
