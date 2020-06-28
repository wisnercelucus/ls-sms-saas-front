import { Component, OnInit, Output, Input } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-data-table-row-header',
  templateUrl: './data-table-row-header.component.html',
  styleUrls: ['./data-table-row-header.component.css']
})
export class DataTableRowHeaderComponent implements OnInit {
  @Input() entityName:string;
  faPlus = faPlus;
  
  constructor() { }

  ngOnInit(): void {
  }

}
