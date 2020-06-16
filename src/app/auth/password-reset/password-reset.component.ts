import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  bannerText:{p:string, btn:string}
  constructor() { }

  ngOnInit(): void {
    this.bannerText =
    {'p': "Please provide your email address in the form bellow. We will help you recover your account.",
    'btn': 'Get involved'
   } 
  }

  onSubmit(form:NgForm){
    
  }

}
