import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SchoolsComponent } from './schools/schools.component';

const routes: Routes = [
  {path:'', component:WelcomeComponent},
  
  {path:'school', redirectTo: '/school/feed', pathMatch: 'full'},
  {path:'donate', redirectTo: '/donate', pathMatch: 'full'},
  {path: 'auth', redirectTo:'/auth/login', pathMatch:'full'},

  {path:':name', component:SchoolsComponent},
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
