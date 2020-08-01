import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { User } from 'src/app/users/user.model';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { FeedService } from '../feed.service';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/users/users.service';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  post:Post;
  loginUser:User;
  postId:number;

  postSub:Subscription;
  singlePostChangeSub:Subscription;
  loginUserSub:Subscription;
  tenantUrlSub:Subscription;

  tenantUrl:string;

  constructor(private route:ActivatedRoute,
    private router:Router,
    private usersService:UsersService,
     private feedService:FeedService, private appService:AppService) { }
     
  ngOnDestroy(): void {
    this.postSub.unsubscribe();
    this.singlePostChangeSub.unsubscribe(); 
    this.loginUserSub.unsubscribe();
    this.tenantUrlSub.unsubscribe();
    
  }

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean => {
      return false;
     };

    this.postId = this.route.snapshot.params['id'];
    this.getPost(this.postId);
    
    this.singlePostChangeSub = this.feedService.refreshNeeded.subscribe(
      res=>{
        this.getPost(this.postId);
      }
    )

    this.getLogingUser();

   this.tenantUrlSub = this.appService.TENANT_URL.subscribe(
      url => {
          this.tenantUrl = url;
      }
    )

  }
  getLogingUser(){
    this.loginUserSub = this.usersService.loginUser.subscribe(
      user=>{

          this.loginUser = user;
      }
    );
}
  getPost(id:number){
    this.postSub = this.feedService.getPost(id).subscribe(
      res=>{
        this.post = res;
      },
      err=>{
        console.log(err)
      }
    )
  }

}
