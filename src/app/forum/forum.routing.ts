import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ForumComponent } from './forum.component';

const routes: Routes = [
    {path:'forums', component:ForumComponent, 
      canActivate:[AuthGuard]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ForumRoutingModule{
  
}