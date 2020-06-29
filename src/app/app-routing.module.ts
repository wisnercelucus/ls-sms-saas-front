import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { ForumComponent } from './forum/forum.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:'', component:WelcomeComponent, canActivate:[AuthenticatedGuard]},
  {path: 'forums', component:ForumComponent, canActivate:[AuthGuard]},
  
  {path:'school', redirectTo: '/school', pathMatch: 'full'},
  {path:'donate', redirectTo: '/donate/process', pathMatch: 'full'},
  {path: 'auth', redirectTo:'/auth/login', pathMatch:'full'},
  {path: 'accounts', redirectTo:'/accounts/feed', pathMatch:'full'},
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
