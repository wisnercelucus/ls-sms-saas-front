import { User } from '../../users/user.model';
import { Post } from './post.model';

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