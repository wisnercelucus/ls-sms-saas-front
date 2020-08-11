import { Category } from './category.model';
import { User } from 'src/app/users/models/user.model';

export interface Topic{
    id:number;
    category?:Category;
    user:User;
    title:string;
    content:string;
    date?:Date;
    last_active?:Date;
    reindex_at?:Date;
    is_pinned?:boolean;
    is_globally_pinned?:boolean;
    is_closed?:boolean;
    is_removed?:boolean;
    view_count?:number;
    comment_count?:number;
    timesince?:string;
    comments?:Comment[];
    total_comments?:number;
    up_liked?:any;
    down_liked?:any;
    did_up_like?:boolean;
    did_down_like?:boolean;
    up_likes?:number;
    down_likes?:number;
}