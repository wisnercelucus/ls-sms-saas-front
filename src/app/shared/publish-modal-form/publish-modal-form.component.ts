import { Component, OnInit, Inject, Input, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { UsersService } from 'src/app/users/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-publish-modal-form',
  templateUrl: './publish-modal-form.component.html',
  styleUrls: ['./publish-modal-form.component.css']
})
export class PublishModalFormComponent implements OnDestroy{
  @Input() username:string;
  sub:Subscription;
  

  constructor(
    public dialogRef: MatDialogRef<PublishModalFormComponent>,
    private usersService:UsersService) {
      this.sub = this.usersService.loginUser.subscribe(
        user=>{
            this.username = user.username;
        }
      )
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
}
