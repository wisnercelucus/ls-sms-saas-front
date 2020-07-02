import {Action} from '@ngrx/store';

export const LOGIN_START= '[Auth] Login Start';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';


export class LoginStart implements Action{
    readonly type = LOGIN_START;

    constructor(
        public payload:{
            username:string,
            password:string
        }
    ){} 
}


export class Login implements Action{
    readonly type = LOGIN;

    constructor(
        public payload:{
            username:string,
            email:string,
            token:string,
        }
    ){} 
}

export class Logout implements Action{
    readonly type = LOGOUT;
}

export type AuthActions = Login | Logout;