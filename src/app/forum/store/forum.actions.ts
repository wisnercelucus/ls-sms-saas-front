import { Action } from '@ngrx/store';
import { Topic } from '../topic.model';


export const SET_TOPICS = '[Forum] Set Topics';

export class SetTopics implements Action{
    readonly type = SET_TOPICS;

    constructor(public payload: Topic[]){
        
    }
}

export type ForumActions = SetTopics;
