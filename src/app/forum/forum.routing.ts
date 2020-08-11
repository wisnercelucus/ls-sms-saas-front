import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForumComponent } from './forum.component';
import { TopicResolver } from './services/topic-resolver.service';
import { AuthGuard } from '../auth/services/auth.guard';
import { LoginUserResolverService } from '../users/services/login-user-resolver.service';

const routes: Routes = [
    {path:'forums', component:ForumComponent, resolve:{loginUser:LoginUserResolverService, topics:TopicResolver},
      canActivate:[AuthGuard]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    providers:[TopicResolver, LoginUserResolverService],
    exports:[RouterModule]
})
export class ForumRoutingModule{
  
}