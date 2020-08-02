import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Category } from './category.model';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class ForumsService{
    tenantUrl:string;
    instance:string;

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
            //console.log(res)
          })
        );
    }

    


}