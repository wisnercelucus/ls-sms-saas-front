import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ForumComponent } from './forum.component';
import { TopicResolver } from './services/topic-resolver.service';

const routes: Routes = [
    {path:'forums', component:ForumComponent, resolve:{topics:TopicResolver},
      canActivate:[AuthGuard]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    providers:[TopicResolver],
    exports:[RouterModule]
})
export class ForumRoutingModule{
  
}