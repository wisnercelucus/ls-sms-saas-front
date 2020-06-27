import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { UsersComponent } from './users.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { FeedComponent } from './feed/feed.component';

const routes: Routes = [
    {path: 'accounts', component:UsersComponent, canActivate:[AuthGuard],
        children:[
            {path:'feed', component:FeedComponent},
            {path:'password-change', component:PasswordChangeComponent},
            {path:':username', component:ProfileComponent},
        ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class UsersRoutingModule{

}