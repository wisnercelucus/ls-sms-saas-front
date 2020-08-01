import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user.model';
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {
  
  usersList:User[];

  loginUserSub:Subscription;
  usersListSub:Subscription;
  followUserSub:Subscription;
  tenantUrlSub:Subscription;
  followingListSub:Subscription;
  usersListChangedSub:Subscription;
  followersListSub:Subscription;

  loginUser:User;
  tenantUrl:string;
  followersList:User[]
  followingList:User[]
  //selected = new FormControl(0)

  constructor(private usersService:UsersService, private appService:AppService) { }

  ngOnDestroy(): void {

      this.usersListChangedSub.unsubscribe()
    

      this.usersListSub.unsubscribe()
    


      this.followUserSub.unsubscribe()
    

      this.loginUserSub.unsubscribe()
    

      this.tenantUrlSub.unsubscribe()

      this.followersListSub.unsubscribe()
    

      this.followingListSub.unsubscribe()
    
  }

  ngOnInit(): void {
    
    this.usersListSub = this.usersService.getUsersList().subscribe(
      res=>{
        this.usersList = res;
      }
    )

    this.usersListChangedSub = this.usersService.usersListrefreshNeeded.subscribe(
      res=>{
        this.usersListSub = this.usersService.getUsersList().subscribe(
          res=>{
            this.usersList = res;
          }
        )
        this.onGetFollowers();
        this.onGetFollowing();        
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
    this.followersListSub = this.usersService.getFollowers()
    .subscribe(
      res=>{
        this.followersList = res;
      }
      
    )
  }


  onGetFollowing(){

    this.followingListSub = this.usersService.getFollowing()
    .subscribe(
      res=>{
        this.followingList = res;

      }
      
    )
  }
}
