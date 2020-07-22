import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';
import { User } from 'src/app/users/user.model';

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
import { Subscription } from 'rxjs';
import { FeedService } from '../feed.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { UsersService } from 'src/app/users/users.service';
import { NgForm } from '@angular/forms';
import { PostShareModalFormComponent } from 'src/app/shared/post-share-modal-form/post-share-modal-form.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from 'src/app/shared/delete-confirm-dialog/delete-confirm-dialog.component';
import { PublishModalFormComponent } from 'src/app/shared/publish-modal-form/publish-modal-form.component';
import { PostReportDialogComponent } from 'src/app/shared/post-report-dialog/post-report-dialog.component';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post:Post;
  loginUser:User;

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

  postsSub:Subscription;
  createCommentSub:Subscription;
  loginUserSub:Subscription;
  postLikeSub:Subscription;
  votePollSub:Subscription;
  changeVoteSub:Subscription;
  likeCommentSub:Subscription;
  
  toggleCommentForm:false;

  centered = false;
  disabled = false;
  unbounded = false;
  radius: number;
  color: string;
  
  tenantUrl:string;
  deletePostSub: Subscription;


  constructor(public dialog: MatDialog, 
    public dialog_: MatDialog, 
    public dialog__: MatDialog, 
    private appService: AppService, 
    private usersService: UsersService, 
    private feedService:FeedService, 
    private router:Router, 
    private route: ActivatedRoute) { }

  getPost(id:number){
    this.router.navigate(['/post', id])
  }

  getUserData(username:string){   
    if(username){
      this.postsSub =  this.feedService.getUserPost(username).subscribe();
      this.router.navigate(['/accounts', username])
    }
  }

  ngOnInit(): void {
    
    this.router.routeReuseStrategy.shouldReuseRoute = (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean => {
      return false;
     };

    this.appService.TENANT_URL.subscribe(
     url => {
         this.tenantUrl = url;
     }
   )
   this.getLogingUser();
 }

 getLogingUser(){
   this.loginUserSub = this.usersService.loginUser.subscribe(
     user=>{
       this.loginUser = user;
     }
   );
}


 ngAfterViewInit(){
     if(!this.loginUser){
       this.getLogingUser()
     }
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
  this.deletePostSub = this.feedService.deletePost(id).subscribe()
  this.router.navigate(['/feed'])
}
 ngOnDestroy(){
   if(this.likeCommentSub){
     this.likeCommentSub.unsubscribe();
   }
  if(this.postsSub){
    this.postsSub.unsubscribe();
  }

   if(this.createCommentSub){
     this.createCommentSub.unsubscribe()
   }
   if(this.deletePostSub){
    this.deletePostSub.unsubscribe()
   }

   if(this.postLikeSub){
     this.postLikeSub.unsubscribe()
   }

   if(this.votePollSub){
     this.votePollSub.unsubscribe()
   }

   if(this.changeVoteSub){
     this.changeVoteSub.unsubscribe()
   }

   if(this.loginUserSub){
     this.loginUserSub.unsubscribe()
   }
 }

 submitComment(form:NgForm){
     if(!form.value.parent_id){
      
       this.createCommentSub = this.feedService.postComment(form.value).subscribe(
         res =>{

         },
         err=>{
           console.log(err)
         }
       )
     }else{
      
       this.createCommentSub = this.feedService.postComment(form.value).subscribe(
         res =>{
         },
         err=>{
           console.log(err)
         }
       )
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
     this.postLikeSub =  this.feedService.likePost(+id).subscribe(
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

   this.changeVoteSub = this.feedService.changeVotePoll(form.value).subscribe(
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

   this.votePollSub = this.feedService.votePoll(form.value).subscribe();
 }

 openDialog(post:Post): void {
   const dialogRef = this.dialog.open(PostShareModalFormComponent, {
     width: '500px',

     data: {
       "post": post
     }
   });

 }

 openDialog_(post): void {
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

onLikeComment(id:number){
  this.likeCommentSub = this.feedService.likeComment(id)
  .subscribe(
    res=>{
      console.log(res)
    }
  )
}

}
