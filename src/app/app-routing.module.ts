import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SchoolsComponent } from './schools/schools.component';
import { DonorsComponent } from './donors/donors.component';
import { DonateComponent } from './donate/donate.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FeedComponent } from './schools/feed/feed.component';


const routes: Routes = [
  {path:'', component:WelcomeComponent},
  {path:'donors', component:DonorsComponent},
  {path:'donate', component:DonateComponent},
  {path:'school', component:SchoolsComponent, children:[
    {path:'feed', component:FeedComponent}
  ]},
  {path:'auth', component:AuthComponent, children:[
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},
  ]},
  
  {path:':name', component:SchoolsComponent},
  
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
