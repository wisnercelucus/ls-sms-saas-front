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

export class User{
    constructor(
                public id:number,
                public username:string,
                public email:string,
                public image:string,
                public is_staff:boolean,
                public is_superuser:boolean,
                public last_name:string,
                public first_name:string
                ){}
}