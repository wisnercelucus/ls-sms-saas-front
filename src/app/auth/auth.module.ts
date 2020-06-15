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
import { MinBannerComponent } from '../welcome/min-banner/min-banner.component';

@NgModule({
    declarations:[
        AuthComponent,
        RegisterComponent,
        LoginComponent,
        MinBannerComponent
        
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
        MinBannerComponent,
        RouterModule, 
        FormsModule, 
        ReactiveFormsModule, 
        MaterialModule,
        HttpClientModule,
    ]
})
export class AuthModule{

}