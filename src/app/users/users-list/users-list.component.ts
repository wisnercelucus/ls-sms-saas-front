import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { takeUntil } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {
  
  usersList:User[];
  /*
  loginUserSub:Subscription;
  usersListSub:Subscription;
  followUserSub:Subscription;
  tenantUrlSub:Subscription;
  followingListSub:Subscription;
  usersListChangedSub:Subscription;
  followersListSub:Subscription;
  */
  loginUser:User;
  tenantUrl:string;
  followersList:User[]
  followingList:User[]
  //selected = new FormControl(0)
  destroy$:Subject<void> = new Subject<void>();

  constructor(private usersService:UsersService, private appService:AppService) { }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
    /*
    if(this.usersListChangedSub){
      this.usersListChangedSub.unsubscribe()
    }
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
    if(this.followersListSub){
      this.followersListSub.unsubscribe()
    }

    if(this.followingListSub){
      this.followingListSub.unsubscribe()
    }
    */
  }

  ngOnInit(): void {
    
    //this.usersListSub = 
    this.usersService.getUsersList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      res=>{
        this.usersList = res;
      }
    )

    //this.usersListChangedSub = 
    this.usersService.usersListrefreshNeeded
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      res=>{
        //this.usersListSub = 
        this.usersService.getUsersList()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
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

    //this.loginUserSub = 
    this.usersService.loginUser
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      user=>{
        this.loginUser = user
      }
        
    )

    //this.tenantUrlSub = 
    this.appService.TENANT_URL
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      res => {
        this.tenantUrl = res;
      }
    )
  }

  onFollowUser(username:string,  id:string){
    //this.followUserSub = 
    this.usersService.followUser({username:username})
    .pipe(takeUntil(this.destroy$))
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
    //this.followersListSub = 
    this.usersService.getFollowers()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      res=>{
        this.followersList = res;
      }
      
    )
  }


  onGetFollowing(){
    
    //this.followingListSub = 
    this.usersService.getFollowing()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      res=>{
        this.followingList = res;

      }
      
    )
  }
}
