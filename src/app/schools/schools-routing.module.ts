import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SchoolsComponent } from './schools.component';
import { FeedComponent } from './feed/feed.component';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './users/profile/profile.component';
import { PasswordChangeComponent } from './users/password-change/password-change.component';
import { PasswordResetComponent } from './users/password-reset/password-reset.component';

const routes: Routes = [
    {path:'school', component:SchoolsComponent, 
      canActivate:[AuthGuard], 
      children:[
        {path: 'accounts', component:UsersComponent, 
          children:[
            {path:'profile', component:ProfileComponent},
            {path:'password-change', component:PasswordChangeComponent},
            {path:'password-reset', component:PasswordResetComponent},
        ]},

        {path:'feed', component:FeedComponent},
        {path:'admin', component:AdminComponent},
      ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class SchoolRoutingModule{

}