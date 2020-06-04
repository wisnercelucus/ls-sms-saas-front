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

  scrollTo(id:string){
    if(document.getElementById(id)){
      document.getElementById(id)
      .scrollIntoView({behavior: 'smooth'});
    }else{
      return;
    }

  }

  navigateTo(id:string, route:string){
    if (location.pathname == route){
      this.scrollTo(id)
    }else{
      this.router.navigate([route])
      .then(
        () =>{
             this.timer = setTimeout( () =>{
             this.scrollTo(id);
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

  onLoadStripe(){
    if(document.readyState === "complete") {
        console.log("Ready");
       
    }
    else if(document.readyState === "interactive") {
        // DOM ready! Images, frames, and other subresources are still downloading.
        console.log("Interceptive")
    }
    else {
        // Loading still in progress.
        // To wait for it to complete, add "DOMContentLoaded" or "load" listeners.
    
        window.addEventListener("DOMContentLoaded", () => {
          console.log("DOM Content Loaded")
        });
    
        window.addEventListener("load", () => {
          console.log("Fully loaded")
        });
    }
  }

}
