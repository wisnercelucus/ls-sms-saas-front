import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({'providedIn':'root'})
export class CommentService{
    tenantUrl:string;

    constructor(private _http:HttpClient) {}

    public getComments(model_type:string, object_id:number){
       return this._http.get(this.tenantUrl + '/comments/api/' + model_type + '/' + object_id +'/all/');
    }
}