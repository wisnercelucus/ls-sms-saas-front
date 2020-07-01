import { AuthUser } from '../../users/user.model';
import * as authActions from './auth.actions';


export interface State{
    authUser:AuthUser;
}

const initialState:State ={
    authUser:null
}

export function authReducer(state=initialState, action: authActions.AuthActions){
    switch(action.type){
        case authActions.LOGIN:
            const authUser = new AuthUser(
                action.payload.username,
                action.payload.email,
                action.payload.token
            )
            return {
                ...state,
                authUser:authUser
            }
        
        case authActions.LOGOUT:
            return {
                ...state,
                user:null
            }

        default:
            return state;
    }
}