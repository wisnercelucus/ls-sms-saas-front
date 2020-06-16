import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { PasswordResetComponent } from './password-reset/password-reset.component';

@NgModule({
    declarations:[
        AuthComponent,
        RegisterComponent,
        LoginComponent,
        PasswordResetComponent        
    ],
    
    imports:[
        SharedModule, 
        RouterModule, 
        FormsModule, 
        ReactiveFormsModule, 
        MaterialModule,
        HttpClientModule,
    ],
    exports:[
        SharedModule, 
        AuthComponent,
        RegisterComponent,
        LoginComponent,
        PasswordResetComponent,  
        RouterModule, 
        FormsModule, 
        ReactiveFormsModule, 
        MaterialModule,
        HttpClientModule,
    ]
})
export class AuthModule{

}