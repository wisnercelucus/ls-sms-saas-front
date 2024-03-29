import {Action} from '@ngrx/store';

export const LOGIN_START= '[Auth] Login Start';
export const LOGIN_FAIL= '[Auth] Login Fail';

export const LOGIN = '[Auth] Login';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';
export const CLEAR_ERROR = '[Auth] Clear Error';


export class LoginStart implements Action{
    readonly type = LOGIN_START;

    constructor(
        public payload:{
            username:string,
            password:string
        }
    ){} 
}

export class LoginFail implements Action{
    readonly type = LOGIN_FAIL;

    constructor(
        public payload:string
    ){} 
}

export class ClearError implements Action{
    readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action{
    readonly type = AUTO_LOGIN;
}

export class Login implements Action{
    readonly type = LOGIN;

    constructor(
        public payload:{
            username:string,
            email:string,
            token:string,
            redirect:boolean
        }
    ){} 
}

export class Logout implements Action{
    readonly type = LOGOUT;
}

export type AuthActions = Login | Logout |LoginStart | LoginFail | ClearError | AutoLogin;