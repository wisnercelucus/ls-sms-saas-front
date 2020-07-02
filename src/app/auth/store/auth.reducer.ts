import { AuthUser } from '../../users/user.model';
import * as authActions from './auth.actions';


export interface State{
    authUser:AuthUser;
    authError:string;
    loading:boolean;
}

const initialState:State ={
    authUser:null,
    authError:null,
    loading:false
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
                authError:null,
                authUser:authUser,
                loading:false
            }
        
        case authActions.LOGOUT:
            return {
                ...state,
                authUser:null
            }
            
        case authActions.LOGIN_START:
            return{
                ...state,
                authError:null,
                loading:true

            }
        case authActions.LOGIN_FAIL:
            return{
                ...state,
                user:null,
                authError:action.payload,
                loading:false
            }
        case authActions.CLEAR_ERROR:
            return{
                ...state,
                authError:null
            }
        default:
            return state;
    }
}