import { User } from 'src/app/users/user.model';

export interface Student{
    id:number;
	first_name:string;
	last_name:string;
	email?:string;
	sex:string;
	phone?:number;
	mobile?:number;
	city?:string;
    address:string;
    
	enrolment_date?:Date;
	birth_date?:Date;
	active?:boolean;
	photo?:string;
    responsible?:Parent[];
    
	created_at?:Date;
	updated_at?:Date;
	deleted_at?:Date;
	user?:User;
}

export interface Parent{
    id:number;
	first_name:string;
	last_name:string;
	email?:string;
	sex:string;
	phone?:number;
	mobile?:number;
	city?:string;
    address:string;
    
	profession?:string
	education_level?:string;
	reslationshipWithPupil?:string; 
    photo?:string;
    
	created_at?:Date;
	updated_at?:Date;
	deleted_at?:Date;
	user?:User;
}

export interface Course{
    id:number;
	name:string;
	description:string;
	base:number;
	coefficient:number;
	grade?:Grade;
	code:string;
    term?:Term;
    version?:string;

	created_at?:Date;
	updated_at?:Date;
	deleted_at?:Date;
	user?:User;
}

export interface ExamMark{
    id:number;
	course?:Course;
	pupil?:Student;
	academic_year?:Operation;
	date:Date;
	mark:number;
    term?:Term;
    
	created_at?:Date;
	updated_at?:Date;
	deleted_at?:Date;
	user?:User;
}

export interface Teacher{
    id:number;
	first_name:string;
	last_name:string;
	email?:string;
	sex:string;
	phone?:number;
	mobile?:number;
	city?:string;
    address:string;

	academic_level?:string;
	active?:boolean;
	photo?:string;
    course?:Course[];
    
	created_at?:Date;
	updated_at?:Date;
	deleted_at?:Date;
	user?:User;
}

export interface Term{
    id:number;
	name:string;
	start_date?:Date;
    end_date?:Date;
    
	created_at?:Date;
	updated_at?:Date;
	deleted_at?:Date;
	user?:User;
}

export interface Operation{
    id:number;
	name:string;
	start_date?:Date;
    end_date?:Date;
    
	created_at?:Date;
	updated_at?:Date;
	deleted_at?:Date;
	user?:User;
}

export interface Grade{
    id:number;
	name:string;
	description:string;
    
	created_at?:Date;
	updated_at?:Date;
	deleted_at?:Date;
	user?:User;
}

export interface Attendance{
    id:number;
	date:Date;
	pupil?:Student;
	attended:boolean;
	remarks:string;
	left_early?:boolean;
    reason_of_leaving?:string;
    
	created_at?:Date;
	updated_at?:Date;
	deleted_at?:Date;
	user?:User;
}

export interface Payment{
    id:number;
    pupil?:Student;
    amount:number;
    date:Date;
    remark:string;
    
	created_at?:Date;
	updated_at?:Date;
	deleted_at?:Date;
	user?:User;
}