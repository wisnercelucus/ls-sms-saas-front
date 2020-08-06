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

export function forumReducer(state = initialState, action:ForumActions.ForumActions){
    switch(action.type){
        case ForumActions.SET_TOPICS:
            return {
                ...state,
                topics:[...action.payload]
            }
        case ForumActions.SET_CATEGORIES:
            return{
                ...state,
                categories:[...action.payload]
            }
            
        case ForumActions.FETCH_TOPICS:
            return {
                ...state
            }
        case ForumActions.FETCH_CATEGORIES:
            return {
                ...state
            }
        default: {
            return state;
          }
    }
}