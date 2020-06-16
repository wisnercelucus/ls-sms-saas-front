import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { AuthenticatedGuard } from './authenticated.guard';

const routes: Routes = [
    {path:'auth', component:AuthComponent, canActivate:[AuthenticatedGuard], children:[
        {path:'login', component: LoginComponent},
        {path:'register', component: RegisterComponent},
        {path:'password-reset', component:PasswordResetComponent},
    ]},
]

@NgModule({

    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class AuthRoutingModule{}