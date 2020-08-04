import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { faBirthdayCake, 
  faMapMarker, 
  faThumbsUp, 
  faShareAltSquare, 
  faComment, 
  faHeart,
 faSmile , 
 faUserCircle, 
 faUsers, 
 faHome, 
 faUser,
 faComments
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PublishModalFormComponent } from '../publish-modal-form/publish-modal-form.component';
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
  faComments = faComments;
  
  @Input() loginUser:User;
 
  constructor(private router:Router,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(){
    //nothing
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
