import { Component, OnInit } from '@angular/core';
import { faBirthdayCake, 
  faMapMarker, 
  faThumbsUp, 
  faShareAltSquare, 
  faComment, 
  faHeart,
 faSmile , 
 faUserCircle, faUsers, faHome, faUser} from '@fortawesome/free-solid-svg-icons';

 
@Component({
  selector: 'app-feed-side-menu',
  templateUrl: './feed-side-menu.component.html',
  styleUrls: ['./feed-side-menu.component.css']
})
export class FeedSideMenuComponent implements OnInit {
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
  
  constructor() { }

  ngOnInit(): void {
  }

}
