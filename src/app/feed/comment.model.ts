import { User } from '../users/user.model';

export interface Comment{
    id?:number;
    liked?:any;
    user?:User;
    content:string;
    created_at?:Date;
    date_display?:string;
    timesince?:string;
    url?:string;
    content_type:string;
    object_id:number;
    reply_count?:number;
    did_like?:boolean;
    likes?:number;
    replies?:Comment[];
    parent?:number;
}