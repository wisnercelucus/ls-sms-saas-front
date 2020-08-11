import { User } from '../users/models/user.model';

export interface NotificationModel{
    created_at?:Date;
    updated_at?:Date;
    content:string;
    to?:number[];
    read_by?:number[];
    owner?:User;
    object_id?:number;
}