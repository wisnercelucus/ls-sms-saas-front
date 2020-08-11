import { Post } from './post.model';
import { User } from 'src/app/users/models/user.model';

export interface PostReport{
    post:Post;
    user:User;
    detail:string;
    racism:boolean;
    bullying:boolean;
    violence:boolean;
    unauthorized_publish:boolean;
    hate_speech:boolean;
    nudity_or_sexual_content:boolean;
    harassment:boolean;
    fake_news:boolean;
    spam:boolean;
    something_else:boolean;
}