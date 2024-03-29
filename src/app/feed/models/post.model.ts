import { Poll } from './poll.model';
import { User } from 'src/app/users/models/user.model';

export interface PostImage{
    image:string;
}


export interface PostDocs{
    pdf:string;
    title?:string;
}

export interface PostLink{
    title:string;
    description:string;
    image:string;
    url:string;
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
    docs?:PostDocs[];
    pdfs?:PostDocs[];
    previews?:PostLink
}