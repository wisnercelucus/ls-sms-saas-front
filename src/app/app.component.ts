import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';

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
              private appService:AppService,
              private usersService:UsersService) {
    this.urlHasInstance();
   
  }
  
  urlHasInstance(){
    if(window.location.hostname === this.appService.BASE_DOMAIN){
      this.instance=null;
      return false;

    }else{
      const hostName = window.location.hostname.toString();
      const hostNameParts = hostName.split(".")
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

    this.appService.TENANT_URL = 
             this.appService.PROTOCOL 
             + this.instance + "." 
             + this.appService.BASE_DOMAIN 
             + ":" + this.appService.API_PORT

    this.authService.instance = this.instance;
    this.authService.tenantUrl = this.appService.TENANT_URL;

    this.usersService.instance = this.instance;
    this.usersService.tenantUrl = this.appService.TENANT_URL;
    
  }

  

}
