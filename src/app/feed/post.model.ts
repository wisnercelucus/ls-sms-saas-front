import { User } from '../users/user.model';
import { Poll } from './poll.model';

export interface Post{
    id?:number;
    user?:User;
    content:string;
    created_at?:Date;
    date_display?:string;
    total_comments?:number;
    timesince?:string;
    url?:string;
    parent?:Post;
    likes?:number;
    did_like?:boolean;
    image?:string;
    redirect_?:string;
    comments?:Comment[];
    poll?:Poll;
}