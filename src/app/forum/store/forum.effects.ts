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
        console.log(errorRes.error.message)
        //errorMessage = errorRes.error.message.non_field_errors[0];
        return of(new ForumActions.ForumActionFail(errorMessage));
    }

    if(errorRes.error.error.message){
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
            break;
            case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist.';
            break;
            case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct.';
            break;
        }
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