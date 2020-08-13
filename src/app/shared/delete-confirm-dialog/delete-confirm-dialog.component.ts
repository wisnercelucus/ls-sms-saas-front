import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/feed/models/post.model';
import { Subscription, Subject } from 'rxjs';
import { FeedService } from 'src/app/feed/services/feed.service';
import { Router } from '@angular/router';
import { User } from 'src/app/users/models/user.model';
import {Comment} from '../../comments/comment.model';
import { takeUntil } from 'rxjs/operators';
import { Topic } from 'src/app/forum/models/topic.model';


interface DialogData{
  topic?:Topic;
  post?:Post;
  loginUser?: User;
  atPostDetail?:boolean;
  isTopicAnswer?:boolean;
}

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.css']
})
export class DeleteConfirmDialogComponent {
    post:Post;
    topic:Topic;
    comment:Comment;
    loginUser:User;
    atPostDetail:boolean;
    isTopicAnswer:boolean;
    deletePostSub:Subscription;
    destroy$:Subject<void> = new Subject<void>();

   constructor(
    public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private feedService:FeedService,private router:Router) {
        this.loginUser = data['loginUser'];
        this.post = data['post'];
        this.atPostDetail = data['atPostDetail'];
        this.comment = data['comment'];
        this.topic = data['topic'];
        this.isTopicAnswer = data['isTopicAnswer']

    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    deletePost(id:number){
      if(this.atPostDetail){
        this.deletePostSub = this.feedService.deletePost(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          res=>{
            this.dialogRef.close()
            this.router.navigate(['/feed']);
          }
        )
        
      }else{
        this.deletePostSub = this.feedService.deletePost(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          res=>{
            this.dialogRef.close();
          }
        );
      }  
      
    }

    deleteComment(comment:Comment){
      console.log(comment)
    }

    onDeleteComment(id:number){
      if(this.isTopicAnswer){

        console.log("Yes topic answer")

      }else{
        if(this.atPostDetail){
          this.feedService.deleteComment(+id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            res=>{
              this.dialogRef.close();
            }
          )
        }else{
          this.feedService.deleteComment(+id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            res=>{
              this.dialogRef.close();
            }
          )
        }
      }
    }
    
    deleteTopic(id:number){
        console.log(id)
    }

    ngOnDestroy(){
      this.destroy$.next();
      this.destroy$.complete();
       
    }
}
