import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { faTwitter, faFacebook, faInstagram, faYoutube, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { NgForm } from '@angular/forms';


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

  constructor() { }

  ngOnInit(): void {

  }
  
  
  onSubmit(form: NgForm){
    console.log(form.value)
  }
  
  @ViewChild('top')  top: ElementRef;

  onScrollTop(): void{
    console.log('get called')
    this.top.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

}
