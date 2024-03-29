import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {  Subject } from 'rxjs';

import { faPlus, faMinusSquare
} from '@fortawesome/free-solid-svg-icons';

import { NgForm } from '@angular/forms';
import { FeedService } from 'src/app/feed/services/feed.service';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/users/models/user.model';
import { UsersService } from 'src/app/users/services/users.service';

interface DialogData{
  idPostToReport:number;
}

@Component({
  selector: 'app-post-report-dialog',
  templateUrl: './post-report-dialog.component.html',
  styleUrls: ['./post-report-dialog.component.css']
})
export class PostReportDialogComponent implements OnInit, OnDestroy {

  faPlus=faPlus;
  faMinusSquare=faMinusSquare;
/*
  postReportCreateSub:Subscription;
  loginUserSub:Subscription;
*/
  destroy$:Subject<void> = new Subject<void>();
  post_id:number;
  loginUser:User;

  constructor(
    public dialogRef: MatDialogRef<PostReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private feedService:FeedService, 
    private usersService:UsersService
    ) { 
      this.post_id = data.idPostToReport;
      }

  ngOnInit(): void {
    this.getLogingUser();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  onSubmitPostReport(form:NgForm){
    //this.postReportCreateSub = 
      this.feedService.reportPost(form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res=>{
          form.reset()
          this.dialogRef.close()
        },
        err=>{
          //Nothing
        }
      )
  }


  getLogingUser(){
    //this.loginUserSub = 
    this.usersService.loginUser
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      user=>{

          this.loginUser = user;
      }
    );
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete;
    /*
    if(this.postReportCreateSub){
      this.postReportCreateSub.unsubscribe()
    }
    
    if(this.loginUserSub){
      this.loginUserSub.unsubscribe();
    }
    */
    
  }

}
