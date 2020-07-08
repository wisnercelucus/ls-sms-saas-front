import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { UsersComponent } from './users.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { SettingsComponent } from './settings/settings.component';
import { GroupsComponent } from './groups/groups.component';
import { FeedTimelineComponent } from '../feed/feed-timeline/feed-timeline.component';

const routes: Routes = [
    {path: 'accounts', component:UsersComponent, canActivate:[AuthGuard],
        children:[
            {path:'groups', component:GroupsComponent},
            {path:'settings', component:SettingsComponent},
            {path:'password-change', component:PasswordChangeComponent},
            {path:':username', component:ProfileComponent, children:[
                {path:'', component:FeedTimelineComponent }
            ]},
        ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class UsersRoutingModule{

}