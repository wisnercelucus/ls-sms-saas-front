import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SchoolsComponent } from './schools.component';
import { AdminComponent } from './admin/admin.component';
import { RootComponent } from './root/root.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InformationComponent } from './information/information.component';


const routes: Routes = [
    {path:'school', component:SchoolsComponent, 
      canActivate:[AuthGuard], 
      children:[
        {path:'', component:RootComponent},
        {path:'information', component:InformationComponent},
        {path:'dashboard', component:DashboardComponent},
        {path:'admin', component:AdminComponent},
        {path:'tab/:name', component:RootComponent},
      ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class SchoolRoutingModule{

}