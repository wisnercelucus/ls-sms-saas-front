import { Injectable } from '@angular/core';
import { Subscription, BehaviorSubject, Subject } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  loginRedirectUrl:string;
  instance:string;
  baseDomain:string;
  tenantUrl:string;
  
  loginUser = new BehaviorSubject<User>(null);
  usersList = new Subject<User[]>();
  usersListrefreshNeeded = new Subject<void>();

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, 
    private authService:AuthService) { 

  }

  getMyProfile(){
    if(!this.instance){
      return;
    }

    return this.http.get<User>(this.tenantUrl + '/accounts/api/me/', {headers:this.headers}).pipe(
      tap(resData =>{
        this.loginUser.next(resData)
      },
        (err:HttpErrorResponse)=> {
          
            this.handleError(err);
          
        }
      )
   )
  }

  getProfile(username:string){
    if(!this.instance){
      return;
    }

    return this.http.get<User>(this.tenantUrl + '/accounts/api/' + username +'/profile/', {headers:this.headers}).pipe(
      tap(resData =>{
        //this.loginUser.next(resData)
      },
        (err:HttpErrorResponse)=> {
          
            this.handleError(err);
          
        }
      )
   )
  }



  followUser(data:any){

    if(!this.instance){
      return;
    }

    const body = data;


    return this.http.post<User[]>(this.tenantUrl + '/accounts/api/follow/', body).pipe(
      tap(
        (res:User[])=>{
            this.usersListrefreshNeeded.next();
        },

        (err:HttpErrorResponse)=> {
          this.handleError(err);
        }
      )  
   )
  }

  handleError(err:HttpErrorResponse){
    if(err.error.detail == "Token has expired"){
      this.loginUser.unsubscribe()
      this.authService.logout() 
    }
  }

  getUsersList(){

    if(!this.instance){
      return;
    }


    return this.http.get<User[]>(this.tenantUrl + '/accounts/api/users/', {headers:this.headers}).pipe(
      tap(
        (res:User[])=>{
            this.usersList.next(res)
        },

        (err:HttpErrorResponse)=> {
        
            this.handleError(err);
          
        }
      )  
   )
  }


  getFollowers(){

    if(!this.instance){
      return;
    }

     return this.http.get<User[]>(this.tenantUrl + '/accounts/api/followers/').pipe(
      tap(
        (res:User[])=>{
            //console.log(res)
        },

        (err:HttpErrorResponse)=> {
          this.handleError(err);
        }
      )  
   )
  }


  getFollowing(){

    if(!this.instance){
      return;
    }

     return this.http.get<User[]>(this.tenantUrl + '/accounts/api/following/').pipe(
      tap(
        (res:User[])=>{
            //console.log(res)
        },

        (err:HttpErrorResponse)=> {
          this.handleError(err);
        }
      )  
   )
  }

  changePassword(oldPassword:string, newPassword:string){
    if(!this.instance){
      return;
    }
    const body = {'old_password':oldPassword, 'new_password':newPassword}
    return this.http.put(this.tenantUrl + '/accounts/api/password_change/', body, {headers:this.headers}).pipe(
      tap(res=>{

      },
      (err:HttpErrorResponse)=>{
    
          this.handleError(err);
        
      }
      )
    )
  }

  
}
