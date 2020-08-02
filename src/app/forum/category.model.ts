import { User } from '../users/user.model';

export interface Category{
    parent?:Category;
    user:User;
    title:string;
    description:string;
    color?:string;
    sort?:number;
    reindex_at?:Date;
    is_global?:boolean;
    is_closed?:boolean;
    is_removed?:boolean;
    is_private?:boolean;
}