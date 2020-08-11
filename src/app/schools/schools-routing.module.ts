import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolsComponent } from './schools.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InformationComponent } from './information/information.component';
import { SchoolRootComponent } from './school-root/school-root.component';
import { DataTableContentComponent } from './data-table-content/data-table-content.component';
import { EntitiesFormsComponent } from './entities-forms/entities-forms.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { LoginUserResolverService } from '../users/services/login-user-resolver.service';


const routes: Routes = [
    {path:'school', component:SchoolsComponent, 
      canActivate:[AuthGuard],
      resolve:{loginUser:LoginUserResolverService}, 
      children:[
        {path:'', component:SchoolRootComponent, children:[
              {path:'tab/:name', component:DataTableContentComponent},
              {path:':name/add', component:EntitiesFormsComponent}
        ]},
        {path:'information', component:InformationComponent},
        {path:'dashboard', component:DashboardComponent},
        {path:'admin', component:AdminComponent},
      ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    providers:[LoginUserResolverService],
    exports:[RouterModule]
})
export class SchoolRoutingModule{
  
}