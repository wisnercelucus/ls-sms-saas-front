import { User } from '../users/user.model';

export interface Option{
    
}
export interface Poll{
    id?:number;
    user?:User;
    question:string;
    poll_voters?:any;
    options?:any;
    url?:string;
    number_of_vote?:number;
}