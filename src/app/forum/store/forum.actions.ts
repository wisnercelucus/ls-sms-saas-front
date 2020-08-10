import { Action } from '@ngrx/store';
import { Topic } from '../models/topic.model';
import {Comment} from '../../comments/comment.model';
import { Category } from '../models/category.model';


export const SET_TOPICS = '[Forum] Set Topics';
export const FETCH_TOPICS = '[Forum] Fetch Topics';
export const FETCH_TOPICS_SUCCESS = '[Forum] Fetch Topics Success';
export const UPDATE_TOPICS_LOCALY = '[Forum] Update Topic Locally]'
export const CREATE_TOPIC = '[Forum] Create Topic';
export const UPDATE_TOPIC = '[Forum] Update Topic';
export const DELETE_TOPIC = '[Forum] Delete Topic';


export const SET_CATEGORIES = '[Forum] Set Categories';
export const FETCH_CATEGORIES = '[Forum] Fetch Categories';

export const FORUM_ACTION_FAIL = '[Forum] Forum Action Fail';

export const ANSWER_TOPIC = '[Forum] Answer Topic';
export const ANSWER_TOPIC_SUCCESS = '[Forum] Answer Topic Success';

export class SetTopics implements Action{
    readonly type = SET_TOPICS;

    constructor(public payload: Topic[]){
        
    }
}

export class FetchTopics implements Action{
    readonly type = FETCH_TOPICS;
}


export class CreateTopic implements Action{
    readonly type=CREATE_TOPIC;
    constructor(public payload:{topic:Topic, categories:string[]}){

    }
}

export class UpdateTopic implements Action{
    readonly type=UPDATE_TOPIC;
    constructor(public payload:{id:number, topic:Topic, categories:string[]}){}
}

export class UpdateTopicLocally implements Action{
    readonly type=UPDATE_TOPICS_LOCALY;
    constructor(public payload:Topic){}
}


export class DeleteTopic implements Action{
    readonly type=DELETE_TOPIC;
    constructor(public payload:{id:number}){}
}

export class SetCategories implements Action{
    readonly type = SET_CATEGORIES;
    constructor(public payload:Category[]){
    }
}

export class FetchCategories implements Action{
    readonly type = FETCH_CATEGORIES;
}


export class ForumActionFail implements Action{
    readonly type = FORUM_ACTION_FAIL;

    constructor(
        public payload:string
    ){} 
}

export class AnswerTopic implements Action{
    readonly type = ANSWER_TOPIC;

    constructor(
        public payload:Comment
    ){} 
}

export class AnswerTopicSuccess implements Action{
    readonly type = ANSWER_TOPIC_SUCCESS; 
    constructor(public payload:Comment){}
}


export type ForumActions = SetTopics 
                            | FetchTopics 
                            | SetCategories 
                            | FetchCategories
                            | CreateTopic
                            | UpdateTopic
                            | DeleteTopic
                            | UpdateTopicLocally
                            | ForumActionFail
                            | AnswerTopic
                            | AnswerTopicSuccess
                            ;
