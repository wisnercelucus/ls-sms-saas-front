import {Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'src/app/users/models/user.model';


@Component({
  selector: 'app-school-root',
  templateUrl: './school-root.component.html',
  styleUrls: ['./school-root.component.css']
})
export class SchoolRootComponent implements OnInit, OnDestroy {

  panelOpenState = false; 
  atSchoolRoot=false;
  loginUser:User;

  constructor(private router:Router, private route: ActivatedRoute) {
    
  }
  

  ngOnInit(): void { 
    this.router.routeReuseStrategy.shouldReuseRoute = (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean => {
      return false;
     };
     
    this.atSchoolRoot = window.location.pathname === '/school'? true : false;

    this.loginUser = this.route.snapshot.data['loginUser'];
    
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
