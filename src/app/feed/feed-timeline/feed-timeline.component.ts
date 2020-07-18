import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { Post } from 'src/app/feed/post.model';
import { FeedService } from '../feed.service';
import { Subscription } from 'rxjs';
import {  Router, ActivatedRoute, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { UsersService } from 'src/app/users/users.service';
import { User } from 'src/app/users/user.model';
import { NgForm } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MatDialog } from '@angular/material/dialog';
import { PostShareModalFormComponent } from 'src/app/shared/post-share-modal-form/post-share-modal-form.component';
import { DeleteConfirmDialogComponent } from 'src/app/shared/delete-confirm-dialog/delete-confirm-dialog.component';
import { PublishModalFormComponent } from 'src/app/shared/publish-modal-form/publish-modal-form.component';

@Component({
  selector: 'app-feed-timeline',
  templateUrl: './feed-timeline.component.html',
  styleUrls: ['./feed-timeline.component.css']
})
export class FeedTimelineComponent implements OnInit, OnDestroy {

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


  dataSource:Post[];
  
  loginUser:User;

  feedSub:Subscription;
  feedSub1:Subscription;
  routerSubscription:Subscription;
  postsSub:Subscription;
  createCommentSub:Subscription;
  loginUserSub:Subscription;
  postLikeSub:Subscription;
  votePollSub:Subscription;
  changeVoteSub:Subscription;
  subscrition:Subscription;
  navigationSubscription:Subscription; 

  username:string;
  
  toggleCommentForm:false;

  centered = false;
  disabled = false;
  unbounded = false;
  radius: number;
  color: string;

  tenantUrl:string;
  deletePostSub: Subscription;

  constructor(public dialog: MatDialog, public dialog_: MatDialog, 
              private feedService:FeedService, 
              private route:ActivatedRoute, 
              private router:Router, 
              private usersService:UsersService, 
              private appService:AppService) {
     
    }

/*
  initiateVoteForm(){
    let postId:number;
    let fb: FormBuilder;
    let option:any;

    this.voteForm= new FormGroup({
      'question': new FormControl(postId, Validators.required),
      'option': new FormControl(option, Validators.required)
    })

  }*/

  getUserData(username:string){   
    if(username){
      this.postsSub =  this.feedService.getUserPost(this.username).subscribe();
      this.getAllUserPosts();
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
    this.username = this.route.snapshot.params['username'];

    if(!this.username){
      this.postsSub =  this.feedService.getPosts().subscribe();

      this.feedService.refreshNeeded.subscribe(
        ()=>{
          this.postsSub =  this.feedService.getPosts().subscribe();
        }
      )
      this.getAllPosts();
    }else{
        this.postsSub =  this.feedService.getUserPost(this.username).subscribe();

        this.feedService.refreshNeeded.subscribe(
          ()=>{
            this.postsSub =  this.feedService.getUserPost(this.username).subscribe();
          }
        )
        this.getAllUserPosts();
    }

  }
  
  getPost(id:number){
    this.router.navigate(['/post', id])
  }
  
  deletePost(id:number){
    this.deletePostSub = this.feedService.deletePost(id).subscribe()
  }


  getLogingUser(){
    this.loginUserSub = this.usersService.loginUser.subscribe(
      user=>{
        this.loginUser = user;
      }
    );
}


  getAllPosts(){
    this.feedSub = this.feedService.postsListChanged.subscribe(
      (postL:Post[]) =>{
        this.dataSource = postL;
      }
    )
  }

  getAllUserPosts(){
    this.feedSub1 = this.feedService.userPostsListChanged.subscribe(
      (postL:Post[]) =>{
        this.dataSource = postL;
      }
    )
  }

  ngAfterViewInit(){
      if(!this.loginUser){
        this.getLogingUser()
      }
  }

  ngOnDestroy(){

    if(this.navigationSubscription){
      this.navigationSubscription.unsubscribe()
    }

    if(this.feedSub){
      this.feedSub.unsubscribe()
    }
    if(this.feedSub1){
      this.feedSub1.unsubscribe()
    }
    if(this.createCommentSub){
      this.createCommentSub.unsubscribe()
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
    if(this.subscrition){
      this.subscrition.unsubscribe()
    }

    if(this.deletePostSub){
      this.deletePostSub.unsubscribe()
    }
  }

  submitComment(form:NgForm){
      if(!form.value.parent_id){
        //const comment = {content:form.value.content, content_type:form.value.content_type, object_id:form.value.object_id}
        this.createCommentSub = this.feedService.postComment(form.value).subscribe(
          res =>{
            //console.log(res)
          },
          err=>{
            console.log(err)
          }
        )
      }else{
        //const comment = {content:form.value.content, content_type:form.value.content_type, object_id:form.value.object_id}
        this.createCommentSub = this.feedService.postComment(form.value).subscribe(
          res =>{
            //console.log(res)
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
        //element.classList.add("remove")
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

    this.subscrition = dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDeleteConfirmDialog(post:Post): void {
    const dialogRef_ = this.dialog_.open(DeleteConfirmDialogComponent, {
      width: '500px',
      data:{
        post:post,
        loginUser:this.loginUser,
        atPostDetail:false
      }
    });
  }

  openDialog_(post): void {
    const dialogRef = this.dialog.open(PublishModalFormComponent, {
      width: '500px',
      data:{
        post:post,
        editMode_:true
      }
    });
  }

}
