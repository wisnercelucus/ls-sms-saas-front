import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SchoolsComponent } from './schools/schools.component';
import { DonorsComponent } from './donors/donors.component';
import { DonateComponent } from './donate/donate.component';

const routes: Routes = [
  {path:'', component:WelcomeComponent},
  {path:'school', redirectTo: '/school/feed', pathMatch: 'full'},
  {path:'donors', component:DonorsComponent},
  {path:'donate', component:DonateComponent},
  {path: 'auth', redirectTo:'/auth/login', pathMatch:'full'},  
  {path:':name', component:SchoolsComponent},
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
