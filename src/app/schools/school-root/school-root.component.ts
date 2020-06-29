import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-school-root',
  templateUrl: './school-root.component.html',
  styleUrls: ['./school-root.component.css']
})
export class SchoolRootComponent implements OnInit {
  tabName=false;
  panelOpenState = false; 
  constructor(private router:Router, private route: ActivatedRoute) {}
  

  ngOnInit(): void { 
    
  }

  getSelectedtab(tabName:string){
      if(tabName){
        this.tabName=true;
        this.router.navigate(['/school', 'tab', tabName])
      }
  }

}
