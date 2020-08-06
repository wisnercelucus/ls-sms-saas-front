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
            
        case ForumActions.UPDATE_TOPICS_LOCALY:
            let new_topics:Topic[] = []
            new_topics = [...state.topics]
            new_topics.unshift(action.payload)
            
            return{
                ...state,
                topics:new_topics
            } 
        case ForumActions.FORUM_ACTION_FAIL:
            return{
                ...state,
                errorMes: action.payload,
            } 
        case ForumActions.ANSWER_TOPIC_SUCCESS:
            return{
                ...state
            }
                  
        default: {
            return state;
          }
    }
}