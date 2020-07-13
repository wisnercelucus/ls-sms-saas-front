import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user.model';
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {

  usersList:User[];
  usersListSub:Subscription;
  followUserSub:Subscription;

  constructor(private usersService:UsersService) { }
  ngOnDestroy(): void {
    if(this.usersListSub){
      this.usersListSub.unsubscribe()
    }

    if(this.followUserSub){
      this.followUserSub.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.usersListSub = this.usersService.getUsersList().subscribe(
      res=>{
        this.usersList = res;
      }
    )
  }

  onFollowUser(username:string){
    this.followUserSub = this.usersService.followUser({username:username})
    .subscribe(
      res=>{
        console.log(res)
      }
    )
  }

}
