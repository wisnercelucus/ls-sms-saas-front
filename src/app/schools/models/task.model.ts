import { User } from 'src/app/users/models/user.model';

export interface Task{
    description:string;
    due_date?:Date;
    assigned_by?:User;
    assigned_to?:User;
}