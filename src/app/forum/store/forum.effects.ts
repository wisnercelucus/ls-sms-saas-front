import { Actions, Effect, ofType } from '@ngrx/effects';
import * as ForumActions from './forum.actions'
import { switchMap, tap, map } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';
import { Topic } from '../topic.model';
import { Injectable } from '@angular/core';
import { Category } from '../category.model';

@Injectable()
export class ForumEffects{
    tenantUrl:string;
    instance:string;

    @Effect()
    fetchTopics = this.actions$.pipe(
        ofType(ForumActions.FETCH_TOPICS),

        switchMap(
            ()=> {
            return this.http.get<Topic[]>(this.tenantUrl + '/forums/api/topics/')
        }),

        map(topics=> {
            return new ForumActions.SetTopics(topics);
        })
    )

    @Effect()
    fetchCategories = this.actions$.pipe(
        ofType(ForumActions.FETCH_CATEGORIES),

        switchMap(
            ()=> {
            return this.http.get<Category[]>(this.tenantUrl + '/forums/api/categories/')
        }),

        map(categories=> {
            return new ForumActions.SetCategories(categories);
        })
    )
  

    constructor(private actions$:Actions, 
        private http:HttpClient,
        private appService:AppService){
        this.urlHasInstance();
    }


    urlHasInstance(){
        if(window.location.hostname === this.appService.BASE_DOMAIN){
          this.instance=null;
          return false;
    
        }else{
          const hostName = window.location.hostname.toString();
          const hostNameParts = hostName.split(".")
          if(hostNameParts.length >= 3){
            this.instance =  hostNameParts.reverse()[2]
            this.tenantUrl = this.appService.PROTOCOL + this.instance + "." + this.appService.BASE_DOMAIN  + ":" + this.appService.API_PORT;
            return true;
          }else{
            return;
          } 
        }
      }
}