import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { faTwitter, faFacebook, faInstagram, faYoutube, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faTwitter = faTwitter;
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faYoutube = faYoutube;
  faLinkedin = faLinkedinIn;
  year = new Date().getFullYear();
  timer: any;

  constructor(private router: Router) { }
  
  ngOnInit(): void {

  }
  
  onSubmit(form: NgForm){
    console.log(form.value)
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




  toAbout(){
    this.navigateTo("about", "/")
  }

  toPricing(){
    this.navigateTo("pricing", "/")
  }

  toReview(){
    this.navigateTo("testimonials", "/")
  }
  toFAQs(){
    this.navigateTo("faqs", "/")
  }

}
