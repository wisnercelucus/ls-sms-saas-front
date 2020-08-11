import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../models/post.model';

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
 faUserCircle, faUsers, faHome, faUser, faShare} from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { FeedService } from '../services/feed.service';
import { Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { PostShareModalFormComponent } from 'src/app/shared/post-share-modal-form/post-share-modal-form.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from 'src/app/shared/delete-confirm-dialog/delete-confirm-dialog.component';
import { PublishModalFormComponent } from 'src/app/shared/publish-modal-form/publish-modal-form.component';
import { PostReportDialogComponent } from 'src/app/shared/post-report-dialog/post-report-dialog.component';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/users/models/user.model';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post:Post;
  @Input() loginUser:User;
  @Input() tenantUrl:string;

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
  faShare = faShare
/*
  postsSub:Subscription;
  createCommentSub:Subscription;
  postLikeSub:Subscription;
  votePollSub:Subscription;
  changeVoteSub:Subscription;
  likeCommentSub:Subscription;
  */
  toggleCommentForm:false;

  centered = false;
  disabled = false;
  unbounded = false;
  radius: number;
  color: string;
  
 
  //deletePostSub: Subscription;

  destroy$:Subject<void> = new Subject<void>();


  constructor(public dialog: MatDialog, 
    public dialog_: MatDialog, 
    public dialog__: MatDialog, 
    private feedService:FeedService, 
    private router:Router) { }

  getPost(id:number){
    this.router.navigate(['/post', id])
  }

  getUserData(username:string){   
    if(username){
      //this.postsSub =  
      this.feedService.getUserPost(username)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
      this.router.navigate(['/accounts', username])
    }
  }

  ngOnInit(): void {
    
 }

  openDeleteConfirmDialog(post:Post): void {
    const dialogRef_ = this.dialog_.open(DeleteConfirmDialogComponent, {
      width: '500px',
      data:{
        post:post,
        loginUser:this.loginUser,
        atPostDetail:true
      }
    });
  }



 deletePost(id:number){
  //this.deletePostSub = 
  this.feedService.deletePost(id)
  .pipe(takeUntil(this.destroy$))
  .subscribe()
  this.router.navigate(['/feed'])
}
 ngOnDestroy(){
   this.destroy$.next()
   this.destroy$.complete()
   /*
    this.likeCommentSub.unsubscribe();
    this.postsSub.unsubscribe();
    this.createCommentSub.unsubscribe()
    this.deletePostSub.unsubscribe()
    this.postLikeSub.unsubscribe()
    this.votePollSub.unsubscribe()
    this.changeVoteSub.unsubscribe()
   */ 
 }

 submitComment(form:NgForm){
     if(!form.value.parent_id){
       //this.createCommentSub = 
       this.feedService.postComment(form.value)
       .pipe(takeUntil(this.destroy$))
       .subscribe()
     }else{
      //this.createCommentSub = 
       this.feedService.postComment(form.value)
       .pipe(takeUntil(this.destroy$))
       .subscribe()
     }
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

 onToggleCommentForm(id:string){
   let element = document.getElementById(id);
   element.classList.remove('hide')
   element.classList.add("fadeIn")
 }

 onLikePost(id:number){
    //this.postLikeSub =  
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
           document.getElementById("post-like-button"+id).classList.remove("general-icon");
         }else{
           document.getElementById("post-like-button"+id).classList.remove("did_like");
           document.getElementById("post-like-button"+id).classList.add("general-icon");
         }
       },
       err =>{
         console.log(err)
       }

       )
 }

 onChangeVote(id:string, id2:string){
   let element = document.getElementById(id);
   let element2 = document.getElementById(id2);
   element.style.display="none";
   element2.classList.remove("remove");
   element2.classList.add('fadeIn');
 }

 changeVote(form:NgForm, id:string){
   let element = document.getElementById(id);
    //this.changeVoteSub = 
    this.feedService.changeVotePoll(form.value)
   .pipe(takeUntil(this.destroy$))
   .subscribe(
     res=>{
     }
   )
   
 }

 submitVote(form:NgForm){
   if(!form.value['postId']){
     return
   }
   if(!form.value['pollId']){
     return
   }
   if(!form.value['option']){
     return
   }
   //this.votePollSub = 
   this.feedService.votePoll(form.value)
   .pipe(takeUntil(this.destroy$))
   .subscribe();
 }

 openDialog(post:Post): void {
   const dialogRef = this.dialog.open(PostShareModalFormComponent, {
     width: '500px',

     data: {
       "post": post
     }
   });

 }

 openDialog_(post:Post): void {
  const dialogRef = this.dialog_.open(PublishModalFormComponent, {
    width: '500px',
    data:{
      post:post,
      editMode_:true
    }
  })
  }

  openPostReportDialog(postId:number): void {
  const dialogRef = this.dialog__.open(PostReportDialogComponent, {
    width: '500px',
    data:{
      idPostToReport:postId
    }
  });
}

onLikeComment(id:number, elid:string){
  //this.likeCommentSub = 
  this.feedService.likeComment(id)
  .pipe(takeUntil(this.destroy$))
  .subscribe(
    res=>{
      let element = document.getElementById(elid)
      element.children[0].removeChild(element.children[0].children[1])
      let span = document.createElement("span");
      span.innerHTML = res['likes']
      span.style.marginLeft = "5px"
      element.children[0].append(span)

      if(res['liked']){
        element.classList.remove("general-icon"); 
        element.classList.add("did_like"); 
      }else{
        element.classList.remove("did_like");
        element.classList.add("general-icon");
      }
    }
  )
}

customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 1
    },
    740: {
      items: 1
    },
    940: {
      items: 1
    }
  },
  nav: true
}

}
