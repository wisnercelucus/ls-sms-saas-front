import { Actions, Effect, ofType } from '@ngrx/effects';
import * as ForumActions from './forum.actions'
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';
import { Topic } from '../topic.model';
import { Injectable } from '@angular/core';
import { Category } from '../category.model';
import { of } from 'rxjs';



const handleError = (errorRes: any) => {
    let errorMessage = 'An unknown error occurred!';

    if(errorRes){
        return of(new ForumActions.ForumActionFail(errorMessage));
    }

    return of(new ForumActions.ForumActionFail(errorMessage));
    
    };

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
            .pipe(
                map(topics=> {
                return new ForumActions.SetTopics(topics);
            }),
            catchError(
                errorMes=>{
                    return handleError(errorMes)
                }
            )
            )
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

    @Effect()
    CreateTopic = this.actions$.pipe(
        ofType(ForumActions.CREATE_TOPIC),

        switchMap(
            (data:ForumActions.CreateTopic) => {
                const body=data.payload
            return this.http.post<Topic>(this.tenantUrl + '/forums/api/topics/create/',
            body).pipe(
                map(topic => { 
                    return new ForumActions.UpdateTopicLocally(topic)
                }),
                catchError(errorMes=>{
                    return handleError(errorMes)
                })
            );
        }),
        
    )
  
    @Effect()
    CreateAnswer = this.actions$.pipe(
        ofType(ForumActions.ANSWER_TOPIC),

        switchMap(
            (data:ForumActions.AnswerTopic) => {
                const body=data.payload
            return this.http.post<Comment>(this.tenantUrl + '/forums/comments/api/create/',
            body).pipe(
                map(res => { 
                    //console.log(res);
                    return new ForumActions.AnswerTopicSuccess();
                }),
                catchError(errorMes=>{
                    return handleError(errorMes)
                })
            );
        }),
        
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