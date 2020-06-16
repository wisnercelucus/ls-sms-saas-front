import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SchoolsComponent } from './schools.component';
import { FeedComponent } from './feed/feed.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
    {path:'school', component:SchoolsComponent, 
      canActivate:[AuthGuard], 
      children:[
        {path:'feed', component:FeedComponent},
        {path:'admin', component:AdminComponent},
      ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class SchoolRoutingModule{

}