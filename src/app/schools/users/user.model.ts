export class User{
    constructor(
                public username:string,
                public email:string,
                private _token:string,
                private _tokenExpirationDate?: Date){
    }

    get token(){

        if(!this._token){
            return null;
        }
        return this._token;
    }
}