import { Component, OnInit, Input } from '@angular/core';
import { Topic } from '../models/topic.model';
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
import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import * as ForumActions from '../store/forum.actions';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ForumsService } from '../services/forums.service';
import { User } from 'src/app/users/models/user.model';
import { CommentService } from 'src/app/comments/services/comments.service';
import { DeleteConfirmDialogComponent } from 'src/app/shared/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';


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
  destroy$:Subject<void> = new Subject<void>();

  @Input() topic:Topic;
  @Input() tenantUrl:string;
  @Input() loginUser:User;
  contentSafe:any;
  user_image_url:string;
  constructor(private sanitizer: DomSanitizer,
    private store:Store<fromApp.AppState>, 
    private forumsService:ForumsService,
    private _commentsService:CommentService,
    public dialog_: MatDialog, 
    ) { }

  toggleCommentForm:false;

  centered = false;
  disabled = false;
  unbounded = false;
  radius: number;
  color: string;

  ngOnInit(): void {
    this.contentSafe = this.sanitizer.bypassSecurityTrustHtml(this.topic['content'])
      this.user_image_url = this.getUserImageUrl(
        this.topic.user.image, 
        this.topic.user.default_image);
  }

  getSafeContent(content:string){
    return this.sanitizer.bypassSecurityTrustHtml(content)
  }

  getUserImageUrl(url:string, default_url:string):string{
    if(url){
      if(this.urlIsComplete(url)){
        return url;
      }else{
        return this.tenantUrl + url;
      }
    }else{
      return default_url;
    }
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

  onUpLikeTopic(id:number){
    //this.postLikeSub =  
    
     this.forumsService.upLikeTopic(+id)
     .pipe(takeUntil(this.destroy$))
     .subscribe(
       res=>{
         let element = document.getElementById("topic"+id);
         //element.removeChild(element.replaceChild())
         //element.removeChild(element.children[1])
         let span0 = document.createElement("span");
         let span1 = document.createElement("span");
  
         if(+res['down_likes'] == 1){
          span1.innerHTML = res['down_likes'] + " Downvote"
         }else{
          span1.innerHTML = res['down_likes'] + " Downvotes"
         }
  
         if(+res['up_likes'] == 1){
          span0.innerHTML = res['up_likes'] + " Upvote"
         }else{
          span0.innerHTML = res['up_likes'] + " Upvotes"
         }
         
         span1.style.marginRight = "20px"
         span0.style.marginRight = "20px"
         element.replaceChild(span1,element.children[1])
         element.replaceChild(span0,element.children[0])

         if(res['is_up_liked']){
          
          document.getElementById("topic-down-like-button"+id).classList.remove("did_down_like");
          document.getElementById("topic-down-like-button"+id).classList.add("general-icon");
         
           document.getElementById("topic-up-like-button"+id).classList.remove("general-icon");
           document.getElementById("topic-up-like-button"+id).classList.add("did_like"); 
           
         }else{
           document.getElementById("topic-up-like-button"+id).classList.remove("did_like");
           document.getElementById("topic-up-like-button"+id).classList.add("general-icon");
         }
       },
       err =>{
         console.log(err)
       }
  
    )
  }


 onDownLikeTopic(id:number){
  //this.postLikeSub =  
  
   this.forumsService.downLikeTopic(+id)
   .pipe(takeUntil(this.destroy$))
   .subscribe(
     res=>{
       let element = document.getElementById("topic"+id);
       //element.removeChild(element.replaceChild())
       //element.removeChild(element.children[1])
       let span0 = document.createElement("span");
       let span1 = document.createElement("span");

       if(+res['down_likes'] == 1){
        span1.innerHTML = res['down_likes'] + " Downvote"
       }else{
        span1.innerHTML = res['down_likes'] + " Downvotes"
       }

       if(+res['up_likes'] == 1){
        span0.innerHTML = res['up_likes'] + " Upvote"
       }else{
        span0.innerHTML = res['up_likes'] + " Upvotes"
       }
       
       span1.style.marginRight = "20px"
       span0.style.marginRight = "20px"
       element.replaceChild(span1,element.children[1])
       //element.prepend(span1)
       element.replaceChild(span0,element.children[0])
       //element.prepend(span0)

       if(res['is_downliked']){
         document.getElementById("topic-up-like-button"+id).classList.add("general-icon");
         document.getElementById("topic-up-like-button"+id).classList.remove("did_like");

         document.getElementById("topic-down-like-button"+id).classList.remove("general-icon");
         document.getElementById("topic-down-like-button"+id).classList.add("did_down_like"); 
         
       }else{
         document.getElementById("topic-down-like-button"+id).classList.remove("did_down_like");
         document.getElementById("topic-down-like-button"+id).classList.add("general-icon");
       }
     },
     err =>{
       console.log(err)
     }

  )
}

onVoteAnswer(id:number, elid:string, altelid:string){
  //this.likeCommentSub = 
  this.forumsService.voteAnswer(id)
  .pipe(takeUntil(this.destroy$))
  .subscribe(
    res=>{

      let element = document.getElementById(elid);
      let altElement = document.getElementById(altelid);

      element.children[0].removeChild(element.children[0].children[1]);
      altElement.children[0].removeChild(altElement.children[0].children[1]);

      let span = document.createElement("span");
      span.innerHTML = res['up_votes'];
      span.style.marginLeft = "5px";

      let altSpan = document.createElement("span");
      altSpan.innerHTML = res['down_votes'];
      altSpan.style.marginLeft = "5px";

      element.children[0].append(span);
      altElement.children[0].append(altSpan);
      
      if(res['is_voted']){
        altElement.classList.remove('did_like');
        altElement.classList.add('general-icon');
        
        element.classList.remove("general-icon"); 
        element.classList.add("did_like");
        
      }else{
        element.classList.remove("did_like");
        element.classList.add("general-icon");
      }
    }
  )
}

onDownVoteAnswer(id:number, elid:string, altelid:string){
  //this.likeCommentSub = 
  this.forumsService.downVoteAnswer(id)
  .pipe(takeUntil(this.destroy$))
  .subscribe(
    res=>{
    
      let element = document.getElementById(elid);
      let altElement = document.getElementById(altelid);
      
      element.children[0].removeChild(element.children[0].children[1]);
      altElement.children[0].removeChild(altElement.children[0].children[1]);
 
      let span = document.createElement("span");
      span.innerHTML = res['down_votes'];
      span.style.marginLeft = "5px";

      let altSpan = document.createElement("span");
      altSpan.innerHTML = res['up_votes'];
      altSpan.style.marginLeft = "5px";

      element.children[0].append(span);
      altElement.children[0].append(altSpan);

      if(res['is_downvoted']){
        altElement.classList.remove('did_like');
        altElement.classList.add('general-icon');

        element.classList.remove("general-icon"); 
        element.classList.add("did_like"); 
      }else{
        element.classList.remove("did_like");
        element.classList.add("general-icon");
      }
    }
  )
}

  ongetComments(model_type:string, object_id:number){
    this._commentsService.getComments(model_type, object_id)
    .pipe(takeUntil(this.destroy$))
    .subscribe(res=>{
      console.log(res)
    })
  }

  openDeleteConfirmDialog(topic?:Topic, comment?:Comment): void {
    const dialogRef_ = this.dialog_.open(DeleteConfirmDialogComponent, {
      width: '500px',
      data:{
        topic:topic,
        loginUser:this.loginUser,
        atPostDetail:true,
        comment:comment,
        isTopicAnswer:true
      }
    });
  }

}
