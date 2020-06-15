import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../users.component';
import { ProfileComponent } from '../profile/profile.component';
import { PasswordResetComponent } from '../password-reset/password-reset.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UsersComponent,
    ProfileComponent,
    PasswordResetComponent,
    PasswordResetComponent
  ],

  imports: [
    CommonModule,
    RouterModule
  ]
})
export class UsersModule { }
