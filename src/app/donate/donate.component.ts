import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {
  message_select ="A good card"
  message_custom = "custum message"
  constructor() { }

  ngOnInit(): void {
  }

}
