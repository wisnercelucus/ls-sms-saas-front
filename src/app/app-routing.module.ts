import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SchoolsComponent } from './schools/schools.component';
import { AuthenticatedGuard } from './auth/authenticated.guard';

const routes: Routes = [
  {path:'', component:WelcomeComponent, canActivate:[AuthenticatedGuard]},
  
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
