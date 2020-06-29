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

  constructor(private router:Router,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
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