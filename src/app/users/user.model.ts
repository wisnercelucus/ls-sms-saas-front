export class User{
    constructor(
                public username:string,
                public email:string,
                private _token:string,
                public image:string,
                public is_staff:boolean,
                public is_superuser:boolean,
                public last_name:string,
                public user_id:number,
                public first_name:string
                ){
    }

    get token(){

        if(!this._token){
            return null;
        }
        return this._token;
    }
}