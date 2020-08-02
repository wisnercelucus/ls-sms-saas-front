import { Category } from './category.model';
import { User } from '../users/user.model';

export interface Topic{
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
}