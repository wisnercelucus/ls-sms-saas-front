import {HttpClient, HttpParams} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Category } from './category.model';
import { tap } from 'rxjs/operators';
import { Topic } from './topic.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class ForumsService{
    tenantUrl:string;
    instance:string;
    refreshneeded:Subject<void> = new Subject<void>();

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
          //console.log(res)
        })
      );
    }


}