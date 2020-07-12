import { User } from '../users/user.model';

export interface Option{
    id?:number;
    user?:User;
    value:string;
    votes?:number;
    voters?:any;
    percent_vote:string;
}
export interface Poll{
    id?:number;
    user?:User;
    question:string;
    poll_voters?:any;
    options?:Option[];
    url?:string;
    number_of_vote?:number;
}