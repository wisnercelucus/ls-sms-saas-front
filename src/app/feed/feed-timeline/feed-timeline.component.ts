import { Component, OnInit, OnDestroy } from '@angular/core';
import { faBirthdayCake, 
  faMapMarker, 
  faThumbsUp, 
  faShareAltSquare, 
  faComment, 
  faHeart,
 faSmile , 
 faUserCircle, faUsers, faHome, faUser} from '@fortawesome/free-solid-svg-icons';
import { Post } from 'src/app/feed/post.model';
import { FeedService } from '../feed.service';
import { Subscription } from 'rxjs';
import {  Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/users/users.service';
import { User } from 'src/app/users/user.model';
import { NgForm } from '@angular/forms';
import { AppService } from 'src/app/app.service';

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
  dataSource:Post[];
  loginUserSub:Subscription;
  loginUser:User;

  feedSub:Subscription;
  feedSub1:Subscription;
  routerSubscription:Subscription;
  postsSub:Subscription;
  createCommentSub:Subscription;

  username:string;
  

  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;
  tenantUrl:string;

  constructor( private feedService:FeedService, private route:ActivatedRoute, private router:Router, private usersService:UsersService, private appService:AppService) {}

  getUserData(username:string){   
    if(username){
      this.postsSub =  this.feedService.getUserPost(this.username).subscribe();
      this.getAllUserPosts();
      this.router.navigate(['/accounts', username])
    }
  }

  ngOnInit(): void {
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
          this.getAllPosts();
        }
      )
      this.getAllPosts();
    }else{
        this.postsSub =  this.feedService.getUserPost(this.username).subscribe();
        this.getAllUserPosts(); 
    }

  }


  getLogingUser(){
    this.loginUserSub = this.usersService.getMyProfile().subscribe(
      user=>{
        if(user){
          this.loginUser = new User(user['username'],
                          user['email'], 
                          user['image'],
                          user['is_staff'],
                          user['is_superuser'],
                          user['last_name'],
                          user['id'],
                          user['first_name']);
        }

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
    
  }

  ngOnDestroy(){
    if(this.feedSub){
      this.feedSub.unsubscribe()
    }
    if(this.feedSub1){
      this.feedSub1.unsubscribe()
    }
    if(this.createCommentSub){
      this.createCommentSub.unsubscribe()
    }
  }

  submitComment(form:NgForm){
      const comment = {content:form.value.content, content_type:form.value.content_type, object_id:form.value.object_id}
      this.createCommentSub = this.feedService.postComment(comment).subscribe(
        res =>{
          console.log(res)
        },
        err=>{
          console.log(err)
        }
      )
  }


  rezizable(id:string){
    var textarea = document.getElementById(id);

    textarea.addEventListener('keydown', autosize);
    
      function autosize(){
        var el = this;
        setTimeout(function(){
          el.style.cssText = 'height:auto; padding:0';
          el.style.cssText = 'height:' + el.scrollHeight + 'px';
        },0);
    
      }
  }
}
