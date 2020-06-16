import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-min-banner',
  templateUrl: './min-banner.component.html',
  styleUrls: ['./min-banner.component.css']
})
export class MinBannerComponent implements OnInit {
  bannerText = {'p': '', 'btn': ''};
  onDonatePage = false;
  onResetPassword = false;
  constructor() {
    this.updateBannerText(this.whereAmI());
   }

  ngOnInit(): void {

  }

  updateBannerText(route:string): void{
    switch(route){
      case '/donate/process':{
        this.bannerText =
          {'p': 'We need your help to make education affordable and accessible to everyone everywhere.',
          'btn': 'Get involved'
        }
        this.onDonatePage = true;
      break;
      }
      
      case '/auth/register':{
        this.bannerText = 
          {'p': "Start now! It's affordable, secure, and accessible everywhere at any time.",
            'btn': 'Register'
          }
        break;
      }

      case '/donate/donors': {
        this.bannerText =
           {'p': "Your generous donations help us make education what it was meant to be: accessible everywhere.",
           'btn': 'Get involved'
          } 
        break;
      }

      case '/auth/password-reset': {
        this.bannerText =
           {'p': "Please provide your email address in the form bellow. We will help you recover your account.",
           'btn': 'Get involved'
          } 
        break;
      }

    }
  }

  whereAmI(){
    return window.location.pathname;
  }

}