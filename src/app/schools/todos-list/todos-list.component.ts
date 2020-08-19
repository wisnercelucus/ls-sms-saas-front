import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Todo } from '../models/todo.model';

const TODO_DATA: Todo[] = [
  {id: 1, description: 'Reply to the director email.', priority: "High", status: 'Complete'},
  {id: 2, description: 'Update the students exam scores.', priority: 'Moderate', status: 'In progress'},
  {id: 3, description: 'Get data out of the phone.', priority: 'Low', status: 'Not started'},
  {id: 4, description: 'Push new change.', priority: 'Low', status: 'Not started'},

];



@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'description', 'priority'];
  dataSource = new MatTableDataSource<Todo>(TODO_DATA);
  selection = new SelectionModel<Todo>(true, []);

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
  checkboxLabel(row?: Todo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
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
