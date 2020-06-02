import { Component, OnInit, EventEmitter, Output, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() sideNavClose = new EventEmitter<void>();
  isAuth=false;
  authSubscription: Subscription;
  timer: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onCloseSideNav(){
    this.sideNavClose.emit()
  }

  onCloseSideNavRedirect(field: any){
    this.sideNavClose.emit();

    if(field){
      switch(field){
        case 'pricing':{
          this.navigateTo("pricing", "/");
          break;
        }
        case 'about':{
          this.navigateTo("about", "/");
          break;
        }
        case 'faqs':{
          this.navigateTo("faqs", "/");
          break;
        }
        case 'review':{
          this.navigateTo("testimonials", "/");
          break;
        }

        case 'contact':{
          this.navigateTo("contact", "/");
          break;
        }
          
      }
    }
  }
  
  onLogout(){
    this.onCloseSideNav()
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

}

