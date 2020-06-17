import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showLoadingSpinner = false;
  instance:string;

  constructor(private router: Router, 
              private authService: AuthService,
              private appService:AppService) {
    this.urlHasInstance();
   
  }
  

  urlHasInstance(){
    if(window.location.hostname === this.appService.BASE_DOMAIN){
      this.instance=null;
      return false;

    }else{
      const hostName = window.location.hostname.toString();
      const hostNameParts = hostName.split(".")
      const hostNamePartsReversed = []
      if(hostNameParts.length >= 3){
        this.instance =  hostNameParts.reverse()[2]
        return true;
      }else{
        return;
      } 
    }
  }

  ngOnInit(): void{
    this.authService.autoLogin();
    this.appService.setInstance(this.instance);
    this.authService.instance = this.instance;
    this.authService.baseDomain = this.appService.BASE_DOMAIN;
  }

}
