import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Task } from '../models/task.model';
import { DatePipe } from '@angular/common';


const TASK_DATA: Task[] = [
  {id: 1, description: 'Update the field age.', due_date: new Date(), priority:"High", assigned_by: 'Wisner Celucus'},
  {id: 2, description: 'Review index 3.', due_date: new Date(), priority:"Low", assigned_by: 'Wisner Celucus'},
  {id: 3, description: 'Find this report.', due_date: new Date(), priority:"Low", assigned_by: 'Wisner Celucus'},
  {id: 4, description: 'Add the detail to view.', due_date: new Date(), priority:"Moderate", assigned_by: 'Wisner Celucus'},
  {id: 5, description: 'Remove the unnecessary data at column six.', priority:"Low", due_date: new Date(), assigned_by: 'Wisner Celucus'},
  {id: 6, description: 'Fill third row.', due_date: new Date(), priority:"Moderate", assigned_by: 'Wisner Celucus'},
];



@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'description', 'priority', 'due_date'];
  dataSource = new MatTableDataSource<Task>(TASK_DATA);
  selection = new SelectionModel<Task>(true, []);
  

  constructor() { }

  ngOnInit(): void {
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Task): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  formateDate(date:Date, format:any){
    let pipe = new DatePipe('en-US');
    return pipe.transform(date, format);
  }
  getClass(priority:string){
   switch(priority){
     case 'High':{
       return 'high';
     }
     case 'Moderate':{
       return 'moderate';
     }
     case 'Low':{
       return 'low';
     }
     default:{
       return '';
     }
   }
  }
}
