import { Topic } from '../topic.model';
import { Category } from '../category.model';
import * as ForumActions from './forum.actions';

export interface State{
    topics:Topic[],
    categories:Category[]
    
}

const initialState: State = {
    topics:[],
    categories:[]
}

export function forumReducer(state, action:ForumActions.ForumActions){
    switch(action.type){
        case ForumActions.SET_TOPICS:
            return {
                ...state,
                topics:[...action.payload]
            }
        default:
            state
    }
}