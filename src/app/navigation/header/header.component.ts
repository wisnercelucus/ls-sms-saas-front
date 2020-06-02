import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth=false;
  subscription: Subscription;
  constructor(private router: Router) { }
  
  timer: any;
  ngOnInit(): void {

    
  }

  onToggleSiveNav(){
    this.sideNavToggle.emit()

  }

  onLogout(){

  }

  scroolTo(id:string){
    document.getElementById(id)
    .scrollIntoView({behavior: 'smooth'})
  }

  navigateTo(id:string, route:string){
    if (location.pathname == route){
      this.scroolTo(id)
    }else{
      this.router.navigate([route])
      .then(
        () =>{
             this.timer = setTimeout( () =>{
             this.scroolTo(id);
             console.log("called");
             clearTimeout(this.timer)
          }, 700);

          
        }
      )
    } 
  }

  toPricing(){
      this.navigateTo("pricing", "/")
  }

  toAbout(){
    this.navigateTo("about", "/") 
  }
  toContact(){
    this.navigateTo("contact", "/") 
  }

}
