import { Topic } from '../models/topic.model';
import * as ForumActions from './forum.actions';
import {Comment} from '../../comments/comment.model';
import { Category } from '../models/category.model';

export interface State{
    topic_entities:{[id:number]:Topic},
    categories:Category[]
}

const initialState: State = {
    topic_entities: {},
    categories:[]
}

export function forumReducer(state = initialState, action:ForumActions.ForumActions){
    switch(action.type){
        case ForumActions.SET_TOPICS:
            const topics = action.payload;
            const topic_entities = topics.reduce((entities:{[id:number]:Topic}, topic:Topic)=>{
                return {
                    ...entities,
                    [topic.id]: topic
                }
            }, {
                ...state.topic_entities
            })
            return {
                ...state,
                topic_entities
            }
        case ForumActions.SET_CATEGORIES:
            return{
                ...state,
                categories:[...action.payload]
            }
            
        case ForumActions.UPDATE_TOPICS_LOCALY:
            const topic = action.payload;
            let top_entities = JSON.parse(JSON.stringify(state.topic_entities))
            top_entities[topic.id] = topic;
            
            return{
                ...state,
                topic_entities:top_entities
            } 
        case ForumActions.FORUM_ACTION_FAIL:
            return{
                ...state,
                errorMes: action.payload,
            } 
        case ForumActions.ANSWER_TOPIC_SUCCESS:
            const comment:Comment = action.payload;
            let topi_entities = JSON.parse(JSON.stringify(state.topic_entities))
            if(comment.parent){
                let comments: Comment[] = topi_entities[comment.object_id]['comments'];
                comments.find( com => com.id === comment.parent).replies.push(comment);
                topi_entities[comment.object_id]['comments'] =  comments;
               
            }else{
                let comments: Comment[] = topi_entities[comment.object_id]['comments']
                comments.push(comment)
                topi_entities[comment.object_id]['comments'] = comments;
            }
            //top_entities[topic.id] = topic;
            
            return{
                ...state,
                topic_entities:{...topi_entities}
            }
                  
        default: {
            return state;
          }
    }
}