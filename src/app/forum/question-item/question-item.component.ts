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
import { NgForm } from '@angular/forms';
import { User } from 'src/app/users/user.model';
import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import * as ForumActions from '../store/forum.actions';
import { takeUntil } from 'rxjs/operators';


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
  @Input() loginUser:User;
  contentSafe:any;
  user_image_url:string;
  constructor(private sanitizer: DomSanitizer,
    private store:Store<fromApp.AppState>
    ) { }

  toggleCommentForm:false;

  centered = false;
  disabled = false;
  unbounded = false;
  radius: number;
  color: string;

  ngOnInit(): void {
    this.contentSafe = this.sanitizer.bypassSecurityTrustHtml(this.topic['content'])
    if(this.topic.user.image){
      if(this.urlIsComplete(this.topic.user.image)){
        this.user_image_url = this.topic.user.image;
      }else{
        this.user_image_url = this.tenantUrl + this.topic.user.image;
      }
    }else{
      this.user_image_url = this.topic.user.default_image;
    }
  }

  getSafeContent(content:string){
    return this.sanitizer.bypassSecurityTrustHtml(content)
  }


  urlIsComplete(url:string){
    let splited_url = url.split(':')
    if(splited_url[0] == 'http' || splited_url[0] == 'https'){
      return true
    }
    return false
  }

  onToggleCommentForm(id:string){
    let element = document.getElementById(id);
    element.classList.remove('hide')
    element.classList.add("fadeIn")
  }

  rezizable(id:string){
    let textarea = document.getElementById(id);
 
    textarea.addEventListener('keydown', autosize);
    
      function autosize(){
        var el = this;
        setTimeout(function(){
          el.style.cssText = 'height:auto; padding:0';
          el.style.cssText = 'height:' + el.scrollHeight + 'px';
        },0);
    
      }
  }

  submitComment(form:NgForm){
    this.store.dispatch(new ForumActions.AnswerTopic(form.value));
    this.store.dispatch(new ForumActions.FetchTopics());
  }

  public onEditorCreated(quill: any) {
  
    (window as any).mathquill4quill()(quill, {
      displayHistory: true, // defaults to false
      historyCacheKey: '__my_app_math_history_cachekey_', // optional
      historySize: 20, // optional (defaults to 10)
      operators: [["\\sqrt[n]{x}", "\\nthroot"], 
                  ["\\frac{x}{y}","\\frac"], 
                  ["\\ln{x}","\\ln"]]
    });
  }
  getUserData(username:string){
  
  }

  onLikeComment(id:number, ele_id:string){
    
  }

  onLikePost(id:number){
    //this.postLikeSub =  
    /*
     this.feedService.likePost(+id)
     .pipe(takeUntil(this.destroy$))
     .subscribe(
       res=>{

         let element = document.getElementById("post"+id);
         element.removeChild(element.children[0])
         let span = document.createElement("span");
         span.innerHTML = res['likes'] + " Likes"
         span.style.marginRight = "20px"
         element.prepend(span)

         if(res['liked']){
           document.getElementById("post-like-button"+id).classList.add("did_like"); 
         }else{
           document.getElementById("post-like-button"+id).classList.remove("did_like");
         }
       },
       err =>{
         console.log(err)
       }

       )*/
 }

}
