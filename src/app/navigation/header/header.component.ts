import { Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import { Subscription} from 'rxjs';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/users/user.model';
import { AppService } from 'src/app/app.service';

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
  authenticateduser:User;
  image:string;
  instance:string;

  constructor(private router: Router, private authService: AuthService, private appService:AppService) { }
  timer: any;

  ngOnInit(): void {
      this.urlHasInstance();
      
      this.userSubs = this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;
      if(this.isAuthenticated){
        this.authenticateduser = new User(
          user.username,
          user.email,
          user.token,
          user.image,
          user.is_staff,
          user.is_superuser,
          user.last_name,
          user.user_id,
          user.first_name
        );
      }

    });
  }

  onToggleSiveNav(){
    this.sideNavToggle.emit()

  }

  onLogout(){
    this.authService.logout();
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



}
