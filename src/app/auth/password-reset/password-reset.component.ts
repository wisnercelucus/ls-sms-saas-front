import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit, OnDestroy {
  bannerText:{p:string, btn:string}
  restSub: Subscription;
  errorMessage:string;
  successMessage:string;
  isLoading=false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.bannerText =
    {'p': "Please provide your email address in the form bellow. We will help you recover your account.",
    'btn': 'Get involved'
   } 
  }

  onSubmit(form:NgForm){
    this.isLoading=true;
    this.restSub = this.authService.resetPasswordRequest(form.value.email).subscribe(
        resp =>{
          if(resp['status']==="OK"){
            this.successMessage="We have sent you an email to the address provided."
            this.isLoading=false;
          }else{
            console.log("no such property")
            this.successMessage="We have sent you an email to the address provided."
            this.isLoading=false;
          }
          form.resetForm();
          
        },
        err => {
          console.log(err)
          this.isLoading=false;
          this.errorMessage="An error occured."
        }

    )
  }

  ngOnDestroy(){
    if(this.restSub){
      this.restSub.unsubscribe();
    }
    
  }
  onHandleSuccess(){
    this.successMessage="";
  }
  onHandleError(){
    this.errorMessage="";
  }

}
