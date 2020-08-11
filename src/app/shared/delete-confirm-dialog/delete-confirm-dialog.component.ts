import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/feed/models/post.model';
import { Subscription } from 'rxjs';
import { FeedService } from 'src/app/feed/services/feed.service';
import { Router } from '@angular/router';
import { User } from 'src/app/users/models/user.model';


interface DialogData{
  post:Post;
  loginUser: User;
  atPostDetail:boolean;
}

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.css']
})
export class DeleteConfirmDialogComponent {
    post:Post;
    loginUser:User;
    atPostDetail:boolean;
    deletePostSub:Subscription;

   constructor(
    public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private feedService:FeedService,private router:Router) {
        this.loginUser = data['loginUser'];
        this.post = data['post'];
        this.atPostDetail = data['atPostDetail'];
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    deletePost(id:number){
      if(this.atPostDetail){
        this.deletePostSub = this.feedService.deletePost(id).subscribe(
          res=>{
            this.dialogRef.close()
            this.router.navigate(['/feed']);
          }
        )
        
      }else{
        this.deletePostSub = this.feedService.deletePost(id).subscribe(
          res=>{
            this.dialogRef.close();
          }
        );
      }  
      
    }
    ngOnDestroy(){
      if(this.deletePostSub){
        this.deletePostSub.unsubscribe()
      }
       
    }
}
