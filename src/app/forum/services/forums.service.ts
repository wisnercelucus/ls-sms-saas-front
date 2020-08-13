import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Topic } from '../models/topic.model';
import { Subject } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
    providedIn: 'root'
  })
export class ForumsService{
    tenantUrl:string;
    instance:string;
    refreshneeded:Subject<void> = new Subject<void>();
    topics:Topic[];

    constructor(private http:HttpClient){}


    getForumsCategories(){
        return this.http.get<Category[]>(this.tenantUrl + '/forums/api/categories/').pipe(
          tap(res=>{
            //console.log(res)
          })
        );
    }

    createTopic(data:any){
        const body=data;
        return this.http.post(this.tenantUrl + '/forums/api/topics/create/',
        body
        ).pipe(
          tap(res=>{
            this.refreshneeded.next();
          })
        );
    }

    createTopicAnswer(data:any){
      const body=data;
      return this.http.post<Comment>(this.tenantUrl + '/forums/comments/api/create/',
      body).pipe(
        tap(res=>{
          this.refreshneeded.next();
        })
      );
  }

    
    updateTopic(data:any){
      const body=data;
      return this.http.post(this.tenantUrl + '/forums/api/topic/update/',
      body
      ).pipe(
        tap(res=>{
          this.refreshneeded.next();
        })
      );
  }


    uploadFile(file){
      let http: HttpClient;
      let name = '';
      let formData:FormData = new FormData();
      let headers = new Headers();
      name = file.name;
      formData.append('image', file, name);
      const dotIndex = name.lastIndexOf('.');
      const fileName  = dotIndex>0?name.substring(0,dotIndex):name;
      formData.append('name', fileName);
    
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      console.log('formData',formData);
      let params = new HttpParams();
      const options = {
          params: params,
          reportProgress: true,
      };
    //http post return an observer
    //so I need to convert to Promise
      return http.post(this.tenantUrl + '/forums/api/image/create/',formData,options);
    }

    getTopics(){
      return this.http.get<Topic[]>(this.tenantUrl + '/forums/api/topics/').pipe(
        tap(res=>{
        })
      );
    }

    setTopics(topics:[]){
      this.topics.push(...topics)
    }

    getTopicList(){
      return this.topics.slice();
    }

    upLikeTopic(id:number){

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      if(this.tenantUrl){
        return this.http.get(this.tenantUrl + '/forums/api/topic/' + id + '/up_like/', {headers: headers}).pipe();
      }else{
        return;
      }
    }

    downLikeTopic(id:number){

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      if(this.tenantUrl){
        return this.http.get(this.tenantUrl + '/forums/api/topic/' + id + '/down_like/', {headers: headers}).pipe();
      }else{
        return;
      }
    }

    voteAnswer(comment_id:number){
 
      if(this.tenantUrl){
        return this.http.get(this.tenantUrl + '/comments/api/'+ comment_id +'/up_vote/').pipe(
          tap(res=>{
            //this._refreshNeeded.next();
          })
        );
      }else{
        return;
      }
  
     }
  
     downVoteAnswer(comment_id:number){
 
      if(this.tenantUrl){
        return this.http.get(this.tenantUrl + '/comments/api/'+ comment_id +'/down_vote/').pipe(
          tap(res=>{
            //this._refreshNeeded.next();
          })
        );
      }else{
        return;
      }
  
     }
  
     deleteAnswer(comment_id:number){
 
      if(this.tenantUrl){
        return this.http.delete(this.tenantUrl + '/comments/api/'+ comment_id +'/manage/').pipe(
          tap(res=>{
            this.refreshneeded.next();
          })
        );
      }else{
        return;
      }
  
     }

     deleteTopic(id:number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      if(this.tenantUrl){
        return this.http.delete(this.tenantUrl + '/forums/api/topic/' + id + '/delete/', {headers: headers}).pipe(
          tap(res=>{
            this.refreshneeded.next();
          })
        );
      }else{
        return;
      }
     }

}