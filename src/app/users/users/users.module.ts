import { NgModule } from '@angular/core';
import { UsersComponent } from '../users.component';
import { ProfileComponent } from '../profile/profile.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PasswordChangeComponent } from '../password-change/password-change.component';

@NgModule({
  declarations: [
    UsersComponent,
    ProfileComponent,
    PasswordChangeComponent
  ],

  imports: [
    RouterModule,
    SharedModule
  ],
  
  exports:[]
})
export class UsersModule { }
