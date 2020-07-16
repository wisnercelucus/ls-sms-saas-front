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

  constructor(private route:ActivatedRoute, private feedService:FeedService) { }
  ngOnDestroy(): void {
    if(this.postSub){
      this.postSub.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.params['id'];
    this.postSub = this.feedService.getPost(this.postId).subscribe(
      res=>{
        this.post = res;
      },
      err=>{
        console.log(err)
      }
    )
  }

}
