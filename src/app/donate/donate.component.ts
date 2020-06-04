import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {
  message_select ="A good card"
  message_custom = "custum message"
  amountOptions = []
  constructor() {
    this.amountOptions = [
      {'value': '10', 'name': '$10 -- Good'},
      {'value': '25', 'name': '$25 -- Great'},
      {'value': '45', 'name': '$45 -- Amazing'},
      {'value': 'custom', 'name': 'Custom amount'}
    ]
   }

  ngOnInit(): void {
    this.amountOptions = [
      {'value': '10', 'name': '$10 -- Good'},
      {'value': '25', 'name': '$25 -- Great'},
      {'value': '45', 'name': '$45 -- Amazing'},
      {'value': 'custom', 'name': 'Custom amount'},
    ]
  }
  
  onSubmit(form:NgForm){
      console.log(form.value)

  }
}
