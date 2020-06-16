import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.css']
})
export class DonorsComponent implements OnInit {
  bannerText:{p:string, btn:string}
  constructor() { }

  ngOnInit(): void {
    this.bannerText =
    {'p': "Your generous donations help us make education what it was meant to be: accessible everywhere.",
    'btn': 'Get involved'
   } 
  }

}
