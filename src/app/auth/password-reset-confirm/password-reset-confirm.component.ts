import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrls: ['./password-reset-confirm.component.css']
})
export class PasswordResetConfirmComponent implements OnInit {
  bannerText: {p:string,btn:string}

  constructor() { }

  ngOnInit(): void {
    
    this.bannerText =
    {'p': "Please add your new password in the form bellow.",
    'btn': 'Get involved'
   } 
  }

}
