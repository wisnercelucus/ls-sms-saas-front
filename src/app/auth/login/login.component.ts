import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { UsersService } from 'src/app/users/users.service';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLinear = false;
  LoginFormGroup: FormGroup;

  loginForm: FormGroup;
  baseDomain:string;
  hasInstanceUrl = false;
  subsciption:Subscription;
  errorMessage ="";
  bannerText:{p:string, btn:string}

  isLoading:boolean;

  constructor(private router:Router, 
    private authService:AuthService, 
    private _formBuilder: FormBuilder,
    private appSerive:AppService, private usersService:UsersService,
    private store:Store<fromApp.AppState>) {
    this.hasInstanceUrl = this.urlHasInstance();
    this.baseDomain = this.appSerive.BASE_DOMAIN;
  }

  ngOnInit() {
    if(!this.hasInstanceUrl){
      this.initiateLoginFormGroup();
    }else{
      this.initiateLoginForm();
    }

    this.bannerText =
    {'p': "Login to enjoy the great futures we've created for you.",
    'btn': 'Get involved'
   }
   
   this.store.select('auth').subscribe(
      authState=>{
        this.isLoading = authState.loading;
        this.errorMessage = authState.authError;
      }
   )
    
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
     
    this.store.dispatch(new AuthActions.LoginStart(
      {username:this.loginForm.value.username, password:this.loginForm.value.password}
    ))

  }

  onSubmitStepperForm(){
      if(!this.hasInstanceUrl){
        const instance = this.LoginFormGroup.value.instanceName;
        this.subsciption = this.authService.login(
          this.LoginFormGroup.value.userName, 
          this.LoginFormGroup.value.userPassword,
          instance)
          
          .subscribe(
          resp => {
            console.log(resp);
          },
          err => {
            this.errorMessage = err + ". Your school instance, email or password is invalid. If you see correct credentials contact your system administrator.";
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
      if(hostNameParts.length >= 3){
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

  onHandleError(){
    this.store.dispatch(new AuthActions.ClearError())
  }

}
