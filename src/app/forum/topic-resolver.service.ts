import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Topic } from './topic.model';
import { Observable } from 'rxjs';
import {Store} from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import {Actions, ofType} from '@ngrx/effects';
import * as ForumActions from './store/forum.actions'
import { take } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class TopicResolver implements Resolve<Topic[]>{
    constructor(private store:Store<fromApp.AppState>,
        private actions$:Actions
        ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Topic[] | Observable<Topic[]> | Promise<Topic[]> {
        this.store.dispatch(new ForumActions.FetchTopics());
        return this.actions$.pipe(
            ofType(ForumActions.SET_TOPICS),
            take(1)
        )
    }
    

}