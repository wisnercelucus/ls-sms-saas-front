import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLinear = false;
  LoginFormGroup: FormGroup;

  loginForm: FormGroup;
  baseDomain = "domo.local";
  instanceName = "";
  hasInstanceUrl = false;
  subsciption:Subscription;

  constructor(private router:Router, private authService:AuthService, private _formBuilder: FormBuilder) {
    this.hasInstanceUrl = this.urlHasInstance();
  }

  ngOnInit() {
    if(!this.hasInstanceUrl){
      this.initiateLoginFormGroup();
    }else{
      this.initiateLoginForm();
    }
    
    
  }

  initiateLoginFormGroup(){
    this.LoginFormGroup = this._formBuilder.group({
      instanceName: ['', Validators.required],
      userName: ['', Validators.required],
      userPassword: ['', Validators.required]
    });
  }
  
  initiateLoginForm(){
    this.loginForm = new FormGroup({
      username: new FormControl('', {
        validators: [Validators.required]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }


  onSubmit() {
    this.subsciption = this.authService.login(this.instanceName,this.loginForm.value.username, this.loginForm.value.password).subscribe(
      resp => {
        console.log(resp)
        this.router.navigate(['/school/feed']);
      },
      err => {
        console.log(err);
      }
      
    )
  }

  onSubmitStepperForm(){
      if(!this.hasInstanceUrl){
        const instance = this.LoginFormGroup.value.instanceName;
        this.subsciption = this.authService.login(
          instance, this.LoginFormGroup.value.userName, 
          this.LoginFormGroup.value.userPassword)
          
          .subscribe(
          resp => {
            console.log(resp);
          },
          err => {
            console.log(err);
          }
        )
      }
  }

  urlHasInstance(){
    if(window.location.hostname === this.baseDomain){
      return false;
    }else{
      const hostName = window.location.hostname.toString();
      const hostNameParts = hostName.split(".")
      if(hostNameParts.length === 3){
        this.instanceName = hostNameParts[0]
        return true;

      }else{
        return;
      } 
    }
  }

  ngOnDestroy() {
    if(this.subsciption){
      this.subsciption.unsubscribe()
    }
  }
}
