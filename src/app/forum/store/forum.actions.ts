import { Action } from '@ngrx/store';
import { Topic } from '../topic.model';
import { Category } from '../category.model';


export const SET_TOPICS = '[Forum] Set Topics';
export const FETCH_TOPICS = '[Forum] Fetch Topics';

export const SET_CATEGORIES = '[Forum] Set Categories';
export const FETCH_CATEGORIES = '[Forum] Fetch Categories';

export class SetTopics implements Action{
    readonly type = SET_TOPICS;

    constructor(public payload: Topic[]){
        
    }
}

export class FetchTopics implements Action{
    readonly type = FETCH_TOPICS;
}

export class SetCategories implements Action{
    readonly type = SET_CATEGORIES;
    constructor(public payload:Category[]){
    }
}

export class FetchCategories implements Action{
    readonly type = FETCH_CATEGORIES;
}



export type ForumActions = SetTopics 
                            | FetchTopics 
                            | SetCategories 
                            | FetchCategories;
