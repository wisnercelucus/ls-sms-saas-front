import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  panelOpenState = false;
  panelOpenState1 = false;
  constructor() { }

  ngOnInit(): void {
    this.panelOpenState = true;
  }

}
