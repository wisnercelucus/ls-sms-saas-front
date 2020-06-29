import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { FeedComponent } from './feed/feed.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    UsersComponent,
    ProfileComponent,
    PasswordChangeComponent,
    FeedComponent,
    SettingsComponent
  ],

  imports: [
    RouterModule,
    SharedModule
  ],
  
  exports:[]
})
export class UsersModule { }