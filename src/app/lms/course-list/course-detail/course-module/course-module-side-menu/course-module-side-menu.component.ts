import { Component, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-course-module-side-menu',
  templateUrl: './course-module-side-menu.component.html',
  styleUrls: ['./course-module-side-menu.component.css']
})
export class CourseModuleSideMenuComponent implements OnInit {
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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateTo(path:string){
    this.router.navigate([path])
  }

}
