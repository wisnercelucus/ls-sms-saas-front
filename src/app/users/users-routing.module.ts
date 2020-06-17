import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { UsersComponent } from './users.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordChangeComponent } from './password-change/password-change.component';

const routes: Routes = [
    {path: 'accounts', component:UsersComponent, canActivate:[AuthGuard],
        children:[
            {path:':username/profile', component:ProfileComponent},
            {path:'password-change', component:PasswordChangeComponent}
        ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class UsersRoutingModule{

}