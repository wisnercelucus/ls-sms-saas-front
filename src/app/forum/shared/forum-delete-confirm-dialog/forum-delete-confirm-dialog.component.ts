import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/users/models/user.model';
import { takeUntil } from 'rxjs/operators';
import { Topic } from 'src/app/forum/models/topic.model';
import {Comment} from '../../../comments/comment.model';
import { ForumsService } from '../../services/forums.service';

interface DialogData{
  topic?:Topic;
  loginUser?: User;
  atPostDetail?:boolean;
}


@Component({
  selector: 'app-forum-delete-confirm-dialog',
  templateUrl: './forum-delete-confirm-dialog.component.html',
  styleUrls: ['./forum-delete-confirm-dialog.component.css']
})
export class ForumDeleteConfirmDialogComponent implements OnInit, OnDestroy {

  topic:Topic;
  comment:Comment;
  loginUser:User;
  atPostDetail:boolean;
  deletePostSub:Subscription;
  destroy$:Subject<void> = new Subject<void>();

 constructor(
  public dialogRef: MatDialogRef<ForumDeleteConfirmDialogComponent>,
  private forumsService:ForumsService,
  @Inject(MAT_DIALOG_DATA) public data: DialogData, private router:Router) {
      this.loginUser = data['loginUser'];
      this.atPostDetail = data['atPostDetail'];
      this.comment = data['comment'];
      this.topic = data['topic'];
  }

  ngOnInit(){}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteAnswer(id:number){

      if(this.atPostDetail){
          this.forumsService.deleteAnswer(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(res=>{
            this.dialogRef.close();
          })
          
      }else{
        this.forumsService.deleteAnswer(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(res=>{
          this.dialogRef.close();
        })
      }
    
  }
  
  deleteTopic(id:number){
    if(this.atPostDetail){
      this.forumsService.deleteTopic(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res=>{
        this.dialogRef.close();
        this.router.navigate(['/forums'])
      })
     }else{
      this.forumsService.deleteTopic(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res=>{
        this.dialogRef.close();
      })
     }
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
     
  }

}


