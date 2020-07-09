import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { AuthService } from 'src/app/auth/auth.service';
import { AppService } from '../app.service';
import { Post } from './post.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  tenantUrl:string;
  postsListChanged = new Subject<Post[]>();
  allPosts:Post[];
  allUserPosts:Post[];
  userPostsListChanged = new Subject<Post[]>();

  private _refreshNeeded = new Subject<void>();


  constructor(private http: HttpClient, private authService:AuthService, private appService:AppService) {}

  get refreshNeeded(){
    return this._refreshNeeded;
  }
    
   createPost(data:any){
      const body = data;

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      if(this.tenantUrl){
        return this.http.post<Post>(this.tenantUrl + '/feed/api/post/create/create_url/', body).pipe(
          tap(p =>{
              this._refreshNeeded.next();          
          })
        );
      }else{
        return;
      }
   }


   postComment(comment:{content:string, content_type:string, object_id:number}){
    const body= comment;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    

    if(this.tenantUrl){
      return this.http.post(this.tenantUrl + '/feed/comments/api/create/', body , {headers: headers}).pipe(
        tap(res=>{
          this._refreshNeeded.next();
        })
      );
    }else{
      return;
    }

   }
  
  getUserPost(username:string){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    if(this.tenantUrl){
      return this.http.get(this.tenantUrl + '/feed/api/posts/' + username + '/', {headers: headers}).pipe(
        tap(res=>{
          this.allUserPosts = res['results'];
          this.userPostsListChanged.next(this.allUserPosts.slice());
        })
      );
    }else{
      return;
    }
  }

  getPosts(){

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      if(this.tenantUrl){
        return this.http.get(this.tenantUrl + '/feed/api/posts/', {headers: headers}).pipe(
          tap(res=>{
            this.allPosts = res['results'];
            this.postsListChanged.next(this.allPosts.slice());
          })
        );
      }else{
        return;
      }
      
    }
}

