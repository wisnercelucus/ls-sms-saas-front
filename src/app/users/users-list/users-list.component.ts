import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user.model';
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {
  loginUserSub:Subscription;
  usersList:User[];
  usersListSub:Subscription;
  followUserSub:Subscription;
  tenantUrlSub:Subscription;
  followersSub:Subscription;
  followingUserSub:Subscription;

  loginUser:User;
  tenantUrl:string;
  followersList:User[]
  followingList:User[]

  constructor(private usersService:UsersService, private appService:AppService) { }

  ngOnDestroy(): void {
    if(this.usersListSub){
      this.usersListSub.unsubscribe()
    }

    if(this.followUserSub){
      this.followUserSub.unsubscribe()
    }

    if(this.loginUserSub){
      this.loginUserSub.unsubscribe()
    }
    if(this.tenantUrlSub){
      this.tenantUrlSub.unsubscribe()
    }
    if(this.followersSub){
      this.followUserSub.unsubscribe()
    }

    if(this.followingUserSub){
      this.followingUserSub.unsubscribe()
    }
  }

  ngOnInit(): void {

    this.usersListSub = this.usersService.getUsersList().subscribe(
      res=>{
        this.usersList = res;
      }
    )

    this.onGetFollowers();
    this.onGetFollowing();

    this.loginUserSub = this.usersService.loginUser.subscribe(
      user=>{
        this.loginUser = user
      }
        
    )

    this.tenantUrlSub = this.appService.TENANT_URL.subscribe(
      res => {
        this.tenantUrl = res;
      }
    )
  }

  onFollowUser(username:string,  id:string){
    this.followUserSub = this.usersService.followUser({username:username})
    .subscribe(
      res=>{
        let el =  document.getElementById(id)
        if(res['is_following']){
          el.innerText = "Following"
        }else{
          el.innerText = "Follow"
        }
      }
    )
  }

  onGetFollowers(){
    this.followUserSub = this.usersService.getFollowers()
    .subscribe(
      res=>{
        this.followersList = res;
      }
      
    )
  }


  onGetFollowing(){
    this.followingUserSub = this.usersService.getFollowing()
    .subscribe(
      res=>{
        this.followingList = res;
      }
      
    )
  }
  

}
