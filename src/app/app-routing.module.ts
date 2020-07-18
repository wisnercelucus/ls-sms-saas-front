import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthenticatedGuard } from './auth/authenticated.guard';

const routes: Routes = [
  {path:'', component:WelcomeComponent, canActivate:[AuthenticatedGuard]},

  {path: 'feed', redirectTo:'/feed', pathMatch: 'full'},
  {path:'school', redirectTo: '/school', pathMatch: 'full'},
  {path:'donate', redirectTo: '/donate/process', pathMatch: 'full'},
  {path: 'auth', redirectTo:'/auth/login', pathMatch:'full'},
  {path: 'accounts', redirectTo:'/accounts/all', pathMatch:'full'},
  {path: 'forums', redirectTo:'/forums', pathMatch:'full'},
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
