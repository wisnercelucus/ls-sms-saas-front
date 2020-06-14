import { Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import { Subscription} from 'rxjs';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sideNavToggle = new EventEmitter<void>();
  isAuthenticated=false;
  subscription: Subscription;
  userSubs: Subscription;


  constructor(private router: Router, private authService: AuthService) { }
  timer: any;

  ngOnInit(): void {
    this.userSubs = this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;
    });
  }

  onToggleSiveNav(){
    this.sideNavToggle.emit()

  }

  onLogout(){

  }
  
  ngOnDestroy(){
    if (this.userSubs){
      this.userSubs.unsubscribe();
    }
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

}
