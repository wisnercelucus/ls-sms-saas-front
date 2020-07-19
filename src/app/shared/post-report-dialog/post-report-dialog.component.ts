import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsersService } from 'src/app/users/users.service';
import { Subscription } from 'rxjs';

import { faPlus, faMinusSquare
} from '@fortawesome/free-solid-svg-icons';

import { NgForm } from '@angular/forms';
import { FeedService } from 'src/app/feed/feed.service';
import { User } from 'src/app/users/user.model';
import { Post } from 'src/app/feed/post.model';

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

  postReportCreateSub:Subscription;
  loginUserSub:Subscription;

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

  ngAfterViewInit(){
    if(!this.loginUser){
      this.getLogingUser()
    }
  }

  onSubmitPostReport(form:NgForm){
      console.log(form.value)
  }


  getLogingUser(){
    this.loginUserSub = this.usersService.loginUser.subscribe(
      user=>{

          this.loginUser = user;
      }
    );
  }

  ngOnDestroy(){
    if(this.postReportCreateSub){
      this.postReportCreateSub.unsubscribe()
    }
    if(this.loginUserSub){
      this.loginUserSub.unsubscribe();
    }
  }

}
