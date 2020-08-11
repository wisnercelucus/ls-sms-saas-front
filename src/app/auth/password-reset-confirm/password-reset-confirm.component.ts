import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrls: ['./password-reset-confirm.component.css']
})
export class PasswordResetConfirmComponent implements OnInit, OnDestroy {
  bannerText: {p:string,btn:string}
  errorMessage:string;
  valSub:Subscription;
  tokeIsvalid = false;
  isLoading=false;
  retPassConfSub:Subscription;
  passwordNotMatch = false;
  successMessage:string;

  constructor(private authService:AuthService, 
    private route:ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit(): void {
    
    this.bannerText =
    {'p': "Please add your new password in the form bellow.",
    'btn': 'Get involved'
   } 

   this.onValidateToken(this.getToken());
   console.log(this.getEmail())

  }
  
  getToken():string{
    if(this.route.snapshot.paramMap.has("token")){
      return this.route.snapshot.paramMap.get("token")
    }
  }
  getEmail():string{
    if(this.route.snapshot.paramMap.has("email")){
      return this.route.snapshot.paramMap.get("email")
    }
  }
  onValidateToken(token:string){ 

    if(token){
      this.valSub =  this.authService.validateToken(token)
      .subscribe(resp=>{
        if(resp['status']==="OK"){
          this.tokeIsvalid = true;
        }
      },
      err => {
        console.log(err);
        this.errorMessage ="You token is expired. Please send a request for a new one."
        this.tokeIsvalid = false;
      });

    }else{
      return;
    } 
  }

  onSubmit(form:NgForm){
      if(form.value.password != form.value.passwordConfirm){
        this.errorMessage = "The two passwords are different. Please retry.";
        this.passwordNotMatch=true;
      }else{
          this.isLoading = true;
          this.retPassConfSub = this.authService
            .resetPasswordConfirm(this.getToken(), form.value.password)
            .subscribe(resp=>{
              if(resp['status']==="OK"){
                this.successMessage="You have sucessfully reset your password. Please login with your new password."
              }
              this.isLoading=false;
              form.resetForm();
            },
            err=>{
              console.log(err)
              this.isLoading=false;
            });
      }
  }

  onHandleError(){
    this.errorMessage="";
    if(this.passwordNotMatch){
      return;
    }
    this.router.navigate(["/auth/password-reset"]);

  }

  onHandleSuccess(){
    this.errorMessage="";
    this.router.navigate(["/auth/login"]);

  }


  ngOnDestroy(){
    if(this.valSub){
      this.valSub.unsubscribe();
    }
    if(this.retPassConfSub){
      this.retPassConfSub.unsubscribe();
    }
  }

}
