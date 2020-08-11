import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { AppService } from '../../app.service';
import { Post } from '../models/post.model';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  tenantUrl:string;

  allPosts:Post[];
  allUserPosts:Post[];
  singlePost:Post;

  postsListChanged = new Subject<Post[]>();
  userPostsListChanged = new Subject<Post[]>();
  singlePostChange = new Subject<Post>();
  

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
        return this.http.post<Post>(this.tenantUrl + '/feed/api/post/create/', body).pipe(
          tap(p =>{
              this._refreshNeeded.next();          
          })
        );
      }else{
        return;
      }
   }


   postComment(comment:any){
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
  

   likeComment(comment_id:number){
 
    if(this.tenantUrl){
      return this.http.get(this.tenantUrl + '/feed/comments/api/'+ comment_id +'/like/').pipe(
        tap(res=>{
          //this._refreshNeeded.next();
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

    getPost(id:number){

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      if(this.tenantUrl){
        return this.http.get<Post>(this.tenantUrl + '/feed/api/post/' + id, {headers: headers}).pipe(
          tap(res=>{
            this.singlePost = res;
            this.singlePostChange.next(this.singlePost);
          })
        );
        }else{
          return;
        }
      
    }

    likePost(id:number){

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      if(this.tenantUrl){
        return this.http.get(this.tenantUrl + '/feed/api/post/' + id + '/like/', {headers: headers}).pipe();
      }else{
        return;
      }
    }

    deletePost(id:number){

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      if(this.tenantUrl){
        return this.http.delete(this.tenantUrl + '/feed/api/post/' + id + '/delete/', {headers: headers}).pipe(
          tap(res=>{
            console.log(res)
            this._refreshNeeded.next()
          })
        );
      }else{
        return;
      }
    }


    updatePost(data:any, id:number){
      const body = data;

      if(this.tenantUrl){
        return this.http.put(this.tenantUrl + '/feed/api/post/' + id + '/update/', body).pipe(
          tap(res=>{
            this._refreshNeeded.next()
          })
        );
      }else{
        return;
      }
    }



    askPollQuestion(data:any){
      const body = data;

      if(this.tenantUrl){
        return this.http.post<{status:string}>(this.tenantUrl + '/feed/api/poll/create/', body).pipe(
          tap(p =>{
            this._refreshNeeded.next();          
          })
        );
      }else{
        return;
      }
    }



    updatePollQuestion(data:any){
      const body = data;

      if(this.tenantUrl){
        return this.http.put<{status:string}>(this.tenantUrl + '/feed/api/poll/update/', body)
        .pipe(
            tap(p =>{
              this._refreshNeeded.next()
            },
            err=>{
              console.log(err)
            }),
          );
        }else{
        return;
      }
    }

    votePoll(data:any){
      const body = data;

      if(this.tenantUrl){
        return this.http.post<{status:string}>(this.tenantUrl + '/feed/api/poll/vote/', body).pipe(
          tap(p =>{
            this._refreshNeeded.next(); 
            //console.log(p)         
          })
        );
      }else{
        return;
      }
    }

    changeVotePoll(data:any){
      const body = data;

      if(this.tenantUrl){
        return this.http.post<{status:string}>(this.tenantUrl + '/feed/api/poll/vote/change/', body).pipe(
          tap(p =>{
            this._refreshNeeded.next();         
          })
        );
      }else{
        return;
      }
    }

    sharePost(data:any){

      const body = data;

      if(this.tenantUrl){
        return this.http.post<{status:string}>(this.tenantUrl + '/feed/api/post/share/', body).pipe(
          tap(p =>{
            this._refreshNeeded.next();       
          })
        );
      }else{
        return;
      }

    }

    reportPost(data:any){

      const body = data;

      if(this.tenantUrl){
        return this.http.post<{status:string}>(this.tenantUrl + '/feed/api/post/report/create/', body).pipe(
          tap(p =>{
            //this._refreshNeeded.next();       
          })
        );
      }else{
        return;
      }

    }

}

