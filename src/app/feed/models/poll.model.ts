import { User } from 'src/app/users/models/user.model';

export interface Option{
    id?:number;
    user?:User;
    value:string;
    votes?:number;
    voters?:number[];
    percent_vote?:string;
}
export interface Poll{
    id?:number;
    user?:User;
    question:string;
    poll_voters?:number[];
    options?:Option[];
    url?:string;
    is_open?:boolean;
    number_of_vote?:number; 
    open_until?:Date; 
}