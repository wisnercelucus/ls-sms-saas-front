import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { User } from 'src/app/users/user.model';
import { ActivatedRoute } from '@angular/router';
import { FeedService } from '../feed.service';
import { Subscription } from 'rxjs';

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

  constructor(private route:ActivatedRoute, private feedService:FeedService) { }
  ngOnDestroy(): void {
    if(this.postSub){
      this.postSub.unsubscribe();
    }
    if(this.singlePostChangeSub){
      this.singlePostChangeSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.params['id'];
    this.getPost(this.postId);
    
    this.singlePostChangeSub = this.feedService.refreshNeeded.subscribe(
      res=>{
        this.getPost(this.postId);
      }
    )

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
