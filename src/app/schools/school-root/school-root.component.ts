import {Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';


@Component({
  selector: 'app-school-root',
  templateUrl: './school-root.component.html',
  styleUrls: ['./school-root.component.css']
})
export class SchoolRootComponent implements OnInit, OnDestroy {

  panelOpenState = false; 
  atSchoolRoot=false;

  constructor(private router:Router, private route: ActivatedRoute) {
    
  }
  

  ngOnInit(): void { 
    this.router.routeReuseStrategy.shouldReuseRoute = (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean => {
      return false;
     };
     
    this.atSchoolRoot = window.location.pathname === '/school'? true : false;
  }
  ngOnDestroy(){

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
