import { Component, OnInit, OnDestroy } from '@angular/core';

import { Post } from 'src/app/feed/post.model';
import { FeedService } from '../feed.service';
import { Subscription } from 'rxjs';
import {  Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { UsersService } from 'src/app/users/users.service';
import { User } from 'src/app/users/user.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-feed-timeline',
  templateUrl: './feed-timeline.component.html',
  styleUrls: ['./feed-timeline.component.css']
})
export class FeedTimelineComponent implements OnInit, OnDestroy {

  dataSource:Post[];
  
  loginUser:User;

  feedSub:Subscription;
  feedSub1:Subscription;
  postsSub:Subscription;
  loginUserSub:Subscription;


  username:string;
  
  toggleCommentForm:false;

  tenantUrl:string;
  deletePostSub: Subscription;
  tenantUrlSub:Subscription; 

  constructor(
              private feedService:FeedService, 
              private route:ActivatedRoute, 
              private router:Router, 
              private usersService:UsersService, 
              private appService:AppService) {
     
    }


  getUserData(username:string){   
    if(username){
      this.postsSub =  this.feedService.getUserPost(this.username).subscribe();
      this.getAllUserPosts();
      this.router.navigate(['/accounts', username])
    }
  }

  ngOnInit(): void {
    /*
    this.router.routeReuseStrategy.shouldReuseRoute = (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean => {
      return false;
     };
    */
     this.tenantUrlSub =  this.appService.TENANT_URL.subscribe(
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


  ngOnDestroy(){
      this.feedSub.unsubscribe()
      this.feedSub1.unsubscribe()
      this.postsSub.unsubscribe()
      this.loginUserSub.unsubscribe()
      this.tenantUrlSub.unsubscribe()
  }



} 
