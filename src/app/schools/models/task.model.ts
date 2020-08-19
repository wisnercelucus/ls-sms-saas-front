import { User } from 'src/app/users/models/user.model';

export interface Task{
    id?:number;
    description:string;
    due_date?:Date;
    assigned_by?:any;
    assigned_to?:User;
    priority?: string;
}