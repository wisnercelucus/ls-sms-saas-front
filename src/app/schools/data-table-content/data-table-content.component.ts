import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import {Event as ngEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student, Attendance, Teacher, Course, Operation, Payment, Grade, Term, Parent, ExamMark } from './entities.model';

@Component({
  selector: 'app-data-table-content',
  templateUrl: './data-table-content.component.html',
  styleUrls: ['./data-table-content.component.css']
})
export class DataTableContentComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  studentsSelected = false;
  attendancesSelected=false;
  coursesSelected=false;
  termsSelected=false;
  parentsSelected=false;
  paymentsSelected=false;
  gradesSelected=false;
  operationsSelected=false;
  marksSelected=false;
  teachersSelected=false;

  tabName = false;
  entityName:string;
  total:number;
  selectedtab:string;

  displayedColumns: string[] = [];

  dataSource: any;
  faPlus = faPlus;
  tabSelected:string;

  subscription:Subscription;

  
  constructor(private route: ActivatedRoute, private router:Router) { 
    this.subscription = this.router.events.subscribe(
      (event: ngEvent)=> {
      if(event instanceof NavigationStart){
        
      }
      if(event instanceof NavigationEnd){
        this.onInitializetable();
    }

      if(event instanceof NavigationError){
        console.log("Navigation Error");
      }

    })
  }

  ngOnInit(): void {

  }

  onInitializetable(){
    this.selectedtab = this.getTabName();
    switch(this.selectedtab){
        case 'students':{
                this.studentsSelected = true;
                this.attendancesSelected=false;
                this.coursesSelected=false;
                this.termsSelected=false;
                this.parentsSelected=false;
                this.paymentsSelected=false;
                this.gradesSelected=false;
                this.operationsSelected=false;
                this.marksSelected=false;
                this.teachersSelected=false;
                this.initialLizetableOnNav('students', 
                new MatTableDataSource<Student>(STUDENT_DATA),
                ['star', 'id', 'last_name', 'first_name', 'sex', 'city', 'address', 'phone', 'email']);
            break;
          }
          case 'attendances':{
              this.attendancesSelected = true;
              this.studentsSelected = false;
              this.coursesSelected=false;
              this.termsSelected=false;
              this.parentsSelected=false;
              this.paymentsSelected=false;
              this.gradesSelected=false;
              this.operationsSelected=false;
              this.marksSelected=false;
              this.teachersSelected=false;
              this.initialLizetableOnNav('attendances', 
              new MatTableDataSource<Attendance>(ATTENDANCE_DATA),
              ['star','id', 'date', 'attended', 'remarks']);
          break;
          }
    
          case 'parents':{
            this.parentsSelected=true;
            this.attendancesSelected = false;
            this.studentsSelected = false;
            this.coursesSelected=false;
            this.termsSelected=false;
            this.paymentsSelected=false;
            this.gradesSelected=false;
            this.operationsSelected=false;
            this.marksSelected=false;
            this.teachersSelected=false;
            this.initialLizetableOnNav('parents', 
            new MatTableDataSource<Parent>(PARENT_DATA),
            ['star', 'id', 'last_name', 'first_name', 'sex', 'city', 'address', 'phone', 'email']);
        break;
        }
        
        case 'teachers':{
          this.teachersSelected=true;
          this.parentsSelected=false;
          this.attendancesSelected = false;
          this.studentsSelected = false;
          this.coursesSelected=false;
          this.termsSelected=false;
          this.paymentsSelected=false;
          this.gradesSelected=false;
          this.operationsSelected=false;
          this.marksSelected=false;
          this.initialLizetableOnNav('teachers', 
          new MatTableDataSource<Teacher>(TEACHER_DATA),
          ['star', 'id', 'last_name', 'first_name', 'sex', 'city', 'address', 'phone', 'email']);
      break;
      }

        case 'marks':{
          this.marksSelected=true;
          this.parentsSelected=false;
          this.attendancesSelected = false;
          this.studentsSelected = false;
          this.coursesSelected=false;
          this.termsSelected=false;
          this.paymentsSelected=false;
          this.gradesSelected=false;
          this.operationsSelected=false;
          this.teachersSelected=false;
          this.initialLizetableOnNav('exams marks', 
          new MatTableDataSource<ExamMark>(MARK_DATA),
          ['star','id', 'date', 'mark']);
        break;
      }
    
      case 'terms':{
        this.termsSelected=true;
        this.marksSelected=false;
        this.parentsSelected=false;
        this.attendancesSelected = false;
        this.studentsSelected = false;
        this.coursesSelected=false;
        this.paymentsSelected=false;
        this.gradesSelected=false;
        this.operationsSelected=false;
        this.teachersSelected=false;
        this.initialLizetableOnNav('terms', 
        new MatTableDataSource<Term>(TERM_DATA),
        ['star','id', 'name']);
      break;
      }
    
      case 'operations':{
        this.operationsSelected=true;
        this.termsSelected=false;
        this.marksSelected=false;
        this.parentsSelected=false;
        this.attendancesSelected = false;
        this.studentsSelected = false;
        this.coursesSelected=false;
        this.paymentsSelected=false;
        this.gradesSelected=false;
        this.teachersSelected=false;
        this.initialLizetableOnNav('academic year', 
        new MatTableDataSource<Operation>(OPERATION_DATA),
        ['star','id', 'name']);
      break;
      }
    
      case 'payments':{
        this.paymentsSelected=true;
        this.operationsSelected=false;
        this.termsSelected=false;
        this.marksSelected=false;
        this.parentsSelected=false;
        this.attendancesSelected = false;
        this.studentsSelected = false;
        this.coursesSelected=false;
        this.gradesSelected=false;
        this.teachersSelected=false;
        this.initialLizetableOnNav('payments', 
        new MatTableDataSource<Payment>(PAYMENT_DATA),
        ['star','id', 'date', 'amount', 'remark']);
      break;
      }
    
      case 'courses':{
        this.coursesSelected=true;
        this.paymentsSelected=false;
        this.operationsSelected=false;
        this.termsSelected=false;
        this.marksSelected=false;
        this.parentsSelected=false;
        this.attendancesSelected = false;
        this.studentsSelected = false;
        this.gradesSelected=false;
        this.teachersSelected=false;
        this.initialLizetableOnNav('courses', 
        new MatTableDataSource<Course>(COURSE_DATA),
        ['star','id', 'name', 'code', 'description', 'base', 'coefficient']);
      break;
      }
    
      case 'grades':{
        this.gradesSelected = true;
        this.paymentsSelected=false;
        this.operationsSelected=false;
        this.termsSelected=false;
        this.marksSelected=false;
        this.parentsSelected=false;
        this.attendancesSelected = false;
        this.studentsSelected = false;
        this.coursesSelected=false;
        this.teachersSelected=false;
        this.initialLizetableOnNav('grades', 
        new MatTableDataSource<Grade>(GRADE_DATA),
        ['star','id', 'name', 'description']);
      break;
    
      }
    }
  }

  ngAfterViewInit() {
    this.onInitializetable();
}
  initialLizetableOnNav(tab:string, 
    datasource:MatTableDataSource<any>, 
    columns:string[]){
  
    if(tab){
      this.tabName=true;
      this.entityName=tab;
      this.dataSource = datasource;
      this.displayedColumns=columns;
      this.total = +this.dataSource.filteredData.length

      if(this.dataSource){
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }else{
        if(this.paginator){
          this.paginator = null;
        }
      }

    }else{
      return;
    }
    
  }


  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTabName(){
    return this.route.snapshot.paramMap.get('name');
  }

}


const STUDENT_DATA: Student[] = [
  {id:0, last_name:'Celucus', first_name:'Wisner', sex:'Male', address:"Clercine 12", phone:33511661, email:'wcelucus@gmail.com', city:'Tabarre'},
  {id:1, last_name:'Francois', first_name:'Fanfan', sex:'Male', address:"Delmans 14", phone:38017727, email:'alexy@gmail.com', city:'Petion Ville'},
  {id:2, last_name:'Gabeau', first_name:'Daniel', sex:'Male', address:"Laboule 42", phone:39017727, email:'alexy@gmail.com', city:'Petion Ville'},
  {id:3, last_name:'Ducatel', first_name:'Roselaure', sex:'Female', address:"Cap 14", phone:34017727, email:'alexy@gmail.com', city:'Petion Ville'},
  {id:4, last_name:'Jean', first_name:'Janine', sex:'Female', address:"Aquin 14", phone:32017727, email:'alexy@gmail.com', city:'Petion Ville'},
  {id:5, last_name:'Badeau', first_name:'Job', sex:'Male', address:"Clercine 14", phone:320017727, email:'alexy@gmail.com', city:'Petion Ville'},
];


const ATTENDANCE_DATA: Attendance[] = [
  {id:0, date:new Date(), attended:true, remarks:"On time"},
];

const TEACHER_DATA: Teacher[] = [
  {id:1, last_name:'Badeau', first_name:'Fanfan', sex:'Male', address:"Clercine 14", phone:37017727, email:'alexy@gmail.com', city:'Petion Ville'},
];

const COURSE_DATA: Course[] = [
  {id:0, name:'English compostion I', code:'Eng001', description:'Entry level course.', base:10, coefficient:3},
];

const TERM_DATA: Term[] = [
  {id:0, name:'First Control'}
];

const GRADE_DATA: Grade[] = [
  {id:0, name:'First Grade', description:'Entry level course.'}
];

const PAYMENT_DATA: Payment[] = [
  {id:0, date:new Date(), amount:575, remark:'Second versement'}
];

const OPERATION_DATA: Operation[] = [
  {id:0, name:'Academic Year 2020'}
];

const PARENT_DATA: Parent[] = [
  {id:1, last_name:'Badeau', first_name:'Fanfan', sex:'Male', address:"Clercine 14", phone:37017727, email:'alexy@gmail.com', city:'Petion Ville'},
];

const MARK_DATA: ExamMark[] = [
  {id:0, date:new Date(), mark:89}
];