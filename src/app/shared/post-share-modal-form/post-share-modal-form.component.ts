import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import {  Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/feed/models/post.model';
import { NgForm } from '@angular/forms';
import { FeedService } from 'src/app/feed/services/feed.service';
import { takeUntil } from 'rxjs/operators';
import { UsersService } from 'src/app/users/services/users.service';


@Component({
  selector: 'app-post-share-modal-form',
  templateUrl: './post-share-modal-form.component.html',
  styleUrls: ['./post-share-modal-form.component.css']
})
export class PostShareModalFormComponent implements OnInit, OnDestroy {

  username:string;
  /*
  sub:Subscription;
  sharePostSub:Subscription;
  */
 destroy$:Subject<void> = new Subject<void>();

  post:Post;
  

  constructor(
    public dialogRef: MatDialogRef<PostShareModalFormComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: Post,
    private usersService:UsersService,
    private feedService:FeedService
    ) {
      //this.sub =
      this.usersService.loginUser
      .pipe(takeUntil(this.destroy$))
      .subscribe(
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
    this.destroy$.next()
    this.destroy$.complete()
    /*
      if(this.sub){
          this.sub.unsubscribe();
      }
     
      if(this.sharePostSub){
        this.sharePostSub.unsubscribe()
      }
      */
    
  }

  onSharePost(form:NgForm){
    //this.sharePostSub = 
    this.feedService
    .sharePost(form.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      res=>{
        //console.log(res)
        this.dialogRef.close()
      }
    )
  }

}
