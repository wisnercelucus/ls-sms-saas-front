import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showLoadingSpinner = false;

  constructor(private router: Router, private authService: AuthService) {
    
    this.router.events.subscribe((routerEvent: Event) =>{
        if(routerEvent instanceof NavigationStart){
          this.showLoadingSpinner = true;
        }
        if(routerEvent instanceof NavigationEnd){
          this.showLoadingSpinner = false;
        }

      }
    )
    
  }

  ngOnInit(): void{
    this.authService.autoLogin();
  }

}
