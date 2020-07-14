import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/users/users.service';
import { Post } from 'src/app/feed/post.model';
import { NgForm } from '@angular/forms';
import { FeedService } from 'src/app/feed/feed.service';


@Component({
  selector: 'app-post-share-modal-form',
  templateUrl: './post-share-modal-form.component.html',
  styleUrls: ['./post-share-modal-form.component.css']
})
export class PostShareModalFormComponent implements OnInit, OnDestroy {

  username:string;
  sub:Subscription;
  sharePostSub:Subscription;

  post:Post;
  

  constructor(
    public dialogRef: MatDialogRef<PostShareModalFormComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: Post,
    private usersService:UsersService,
    private feedService:FeedService
    ) {
      this.sub = this.usersService.loginUser.subscribe(
        user=>{
            this.username = user.username;
        }
      )
    }

  ngOnInit(): void {
    this.post = this.data['post']
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
    if(this.sharePostSub){
      this.sharePostSub.unsubscribe()
    }
  }

  onSharePost(form:NgForm){
    this.sharePostSub = this.feedService.sharePost(form.value)
    .subscribe(
      res=>{
        console.log(res)
      }
    )
  }

}
