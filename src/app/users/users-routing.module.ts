import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { SettingsComponent } from './settings/settings.component';
import { GroupsComponent } from './groups/groups.component';
import { FeedTimelineComponent } from '../feed/feed-timeline/feed-timeline.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { LoginUserResolverService } from './services/login-user-resolver.service';

const routes: Routes = [
    {path: 'accounts', component:UsersComponent, canActivate:[AuthGuard], runGuardsAndResolvers: 'always',
        resolve:{loginUser:LoginUserResolverService},
        children:[
            {path:'all', component:UsersListComponent},
            {path:'groups', component:GroupsComponent},
            {path:'settings', component:SettingsComponent},
            {path:'password-change', component:PasswordChangeComponent},
            {path:':username', component:ProfileComponent, children:[
                {path:'', component:FeedTimelineComponent },
            ]},
        ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    providers:[LoginUserResolverService],
    exports:[RouterModule]
})
export class UsersRoutingModule{

}