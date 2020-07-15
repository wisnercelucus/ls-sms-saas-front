export class AuthUser{
    constructor(
        public username:string,
        public email:string,
        private _token:string
        ){}
        
        get token(){
        
        if(!this._token){
            return null;
        }
        return this._token;
        }
}

export interface User{
    id:number;
    username:string;
    email:string;
    image:string;
    is_staff:boolean;
    is_superuser:boolean;
    last_name:string;
    first_name:string;
    default_image:string;
            
}

export interface UserProfile{
    is_student:boolean;
    is_support_staff:boolean;
    is_school_admin:boolean;
    is_teacher:boolean;
    cover_image:string;
    id:number;
    user:User;
    updated_by:User,
    default_cover:string
}

