import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-school-root',
  templateUrl: './school-root.component.html',
  styleUrls: ['./school-root.component.css']
})
export class SchoolRootComponent implements OnInit, OnDestroy {

  panelOpenState = false; 
  atSchoolRoot=false;
  subscription:Subscription;

  constructor(private router:Router, private route: ActivatedRoute) {
    this.subscription = this.router.events.subscribe(
      (event: Event) => {
        if(event instanceof NavigationStart){

        }
        if(event instanceof NavigationEnd){
          if(window.location.pathname != '/school'){
              this.atSchoolRoot = false;
          }else{
            this.atSchoolRoot = true;
          }
          
        }
      }
    )

    
  }
  

  ngOnInit(): void { 
    this.atSchoolRoot = window.location.pathname === '/school'? true : false;
  }
  ngOnDestroy(){
      if(this.subscription){
        this.subscription.unsubscribe();
      }
  }

  ngAfterViewInt(){

  }

  getSelectedtab(tabName:string){
      if(tabName){
        this.router.navigate(['/school', 'tab', tabName])
      }else{
        return;
      }
  }

}
