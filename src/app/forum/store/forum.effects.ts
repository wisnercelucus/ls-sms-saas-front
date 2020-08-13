import { Actions, Effect, ofType } from '@ngrx/effects';
import * as ForumActions from './forum.actions'
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';
import { Topic } from '../models/topic.model';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {Comment} from '../../comments/comment.model';
import { Category } from '../models/category.model';


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
    createTopic = this.actions$.pipe(
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
    createAnswer = this.actions$.pipe(
        ofType(ForumActions.ANSWER_TOPIC),

        switchMap(
            (data:ForumActions.AnswerTopic) => {
                
                const body=data.payload

            return this.http.post<Comment>(this.tenantUrl + '/forums/comments/api/create/',
            body).pipe(
                map(comment => { 
                    return new ForumActions.FetchTopics();
                }),
                catchError(errorMes=>{
                    return handleError(errorMes)
                })
            );
        }),
        
    )

    @Effect()
    fetchAnswers = this.actions$.pipe(
        ofType(ForumActions.FETCH_TOPIC_ANSERS),

        switchMap(
            (data:ForumActions.FetchTopicAnswers) => {
                let model_type = data.payload.model_type
                let object_id = data.payload.object_id
            return this.http.get<Comment[]>(this.tenantUrl + '/comments/api/' + model_type + '/' + object_id +'/all/').pipe(
                map(comments => { 
                    return new ForumActions.FetchTopicAnswersSuccess({comments:comments, object_id:object_id});
                }),
                catchError(errorMes=>{
                    return handleError(errorMes)
                })
            );
        }),
        
    )

    @Effect()
    deleteTopic = this.actions$.pipe(
        ofType(ForumActions.DELETE_TOPIC),

        switchMap(
            (data:ForumActions.DeleteTopic) => {
                let id = data.payload.id;
            return this.http.delete<any>(this.tenantUrl + '/forums/api/topic/' + id + '/delete/').pipe(
                map(res => { 
                    return new ForumActions.FetchTopics();
                }),
                catchError(errorMes=>{
                    return handleError(errorMes)
                })
            );
        }),
        
    )

    @Effect()
    deleteAnswers = this.actions$.pipe(
        ofType(ForumActions.DELETE_TOPIC_ANSERS),

        switchMap(
            (data:ForumActions.DeleteTopicAnswers) => {
                let answer_id = data.payload.answer_id;
            return this.http.delete<any>(this.tenantUrl + '/comments/api/' + answer_id + '/manage/').pipe(
                map(res => { 
                    return new ForumActions.FetchTopics();
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