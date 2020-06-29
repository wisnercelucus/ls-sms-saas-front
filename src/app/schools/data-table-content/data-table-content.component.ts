import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import {Event as ngEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from './entities.model';

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
                this.initialLizetableOnNav('students', 
                new MatTableDataSource<Student>(STUDENT_DATA),
                ['star','last_name', 'first_name', 'id', 'sex', 'address']);
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
              this.initialLizetableOnNav('attendances', 
              new MatTableDataSource<Student>(ATTENDANCE_DATA),
              ['star','name', 'position', 'weight', 'symbol']);
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
            this.initialLizetableOnNav('parents', 
            new MatTableDataSource<Student>(ATTENDANCE_DATA),
            ['star','name', 'position', 'weight', 'symbol']);
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
          this.initialLizetableOnNav('exams marks', 
          new MatTableDataSource<Student>(ATTENDANCE_DATA),
          ['star','name', 'position', 'weight', 'symbol']);
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
        this.initialLizetableOnNav('terms', 
        new MatTableDataSource<Student>(ATTENDANCE_DATA),
        ['star','name', 'position', 'weight', 'symbol']);
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
        this.initialLizetableOnNav('academic year', 
        new MatTableDataSource<Student>(ATTENDANCE_DATA),
        ['star','name', 'position', 'weight', 'symbol']);
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
        this.initialLizetableOnNav('payments', 
        new MatTableDataSource<Student>(ATTENDANCE_DATA),
        ['star','name', 'position', 'weight', 'symbol']);
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
        this.initialLizetableOnNav('courses', 
        new MatTableDataSource<Student>(ATTENDANCE_DATA),
        ['star','name', 'position', 'weight', 'symbol']);
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
        this.initialLizetableOnNav('grades', 
        new MatTableDataSource<Student>(ATTENDANCE_DATA),
        ['star','name', 'position', 'weight', 'symbol']);
      break;
    
      }
    }
  }

  ngAfterViewInit() {
    this.onInitializetable();
}
  initialLizetableOnNav(tab:string, 
    datasource:MatTableDataSource<Student>, 
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
  {id:0, last_name:'Celucus', first_name:'Wisner', sex:'Male', address:"Clercine 12"},
];


const ATTENDANCE_DATA: Student[] = [];

