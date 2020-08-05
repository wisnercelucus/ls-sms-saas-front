import { Component, OnInit, Input } from '@angular/core';
import { Topic } from '../topic.model';
import { DomSanitizer } from '@angular/platform-browser';
import { faBirthdayCake, 
  faMapMarker, 
  faThumbsUp, 
  faShareAltSquare, 
  faComment, 
  faHeart,
 faSmile, 
 faChartBar,
 faCheckSquare,
 faTimesCircle,
 faSpinner,
 faUserCircle, faUsers, faHome, faUser, faShare,
 faCommentDots, faPenSquare, faThumbsDown, faRetweet
} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.css'],
  
})
export class QuestionItemComponent implements OnInit {
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
  faChartBar = faChartBar;
  faCheckSquare = faCheckSquare;
  faTimesCircle = faTimesCircle;
  faSpinner = faSpinner;
  faShare = faShare;
  faCommentDots = faCommentDots;
  faPenSquare = faPenSquare;
  faThumbsDown = faThumbsDown;
  faRetweet = faRetweet;

  @Input() topic:Topic;
  @Input() tenantUrl:string;
  contentSafe:any;
  constructor(private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.contentSafe = this.sanitizer.bypassSecurityTrustHtml(this.topic['content'])
  }


}
