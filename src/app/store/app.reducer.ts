import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromForum from '../forum/store/forum.reducer';

export interface AppState{
    auth:fromAuth.State;
    forum:fromForum.State;
}

export const appReducer: ActionReducerMap<AppState>={
    auth:fromAuth.authReducer,
    forum:fromForum.forumReducer 
}