import { User } from '../users/user.model';
import { Poll } from './poll.model';

export interface PostImage{
    image:string;
}

export interface Post{
    id?:number;
    user?:User;
    content:string;
    new_content?:string;
    created_at?:Date;
    date_display?:string;
    total_comments?:number;
    timesince?:string;
    url?:string;
    parent?:Post;
    likes?:number;
    did_like?:boolean;
    redirect_?:string;
    comments?:Comment[];
    poll?:Poll;
    did_vote?:boolean;
    is_owned?: boolean;
    images?:PostImage[];
}