import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {MatCalendarCellCssClasses} from '@angular/material/datepicker';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-entities-forms',
  templateUrl: './entities-forms.component.html',
  styleUrls: ['./entities-forms.component.css']
})
export class EntitiesFormsComponent implements OnInit {
  sexes:string[]= ['Male', 'Female']

  constructor() { }

  ngOnInit(): void {
  }

  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDate();
    return (date === 1 || date === 20) ? 'custom-date-class' : '';
  }

  onSubmit(f:NgForm){
    console.log(f.value)

  }

}
