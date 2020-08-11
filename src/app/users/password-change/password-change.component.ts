import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsersService } from '../services/users.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})

export class PasswordChangeComponent implements OnInit, OnDestroy {
  isLoading=false;
  successMessage="";
  errorMessage="";

  changePasswordSub:Subscription;

  constructor(private usersService:UsersService, 
                  private authService:AuthService
                  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    if(this.changePasswordSub){
      this.changePasswordSub.unsubscribe();
    }
      
  
  }

  onSubmit(form:NgForm){
    if(!(form.value.password === form.value.passwordConfirm)){

        this.errorMessage ="The new password and password confirm do not match."

    }else{
    this.isLoading = true;

     this.changePasswordSub = this.usersService.changePassword(form.value.oldPassword, form.value.password).subscribe(
       resp =>{
        this.successMessage ="Your password was changed successfully. Please login with your new password.";
         this.isLoading = false;
         this.successMessage ="Congratulations! You have successfully changed your password. Please login with your new password."
      },

       err => {
         this.errorMessage = "An error occured."
          this.isLoading = false;

       }
     )
      
    }

    form.resetForm;
  }

  onHandleSuccess(){
    this.successMessage="";
    this.authService.logout();
  }

  onHandleError(){
    this.errorMessage="";
  
  }

}
