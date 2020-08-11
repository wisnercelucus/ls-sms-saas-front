import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { FeedComponent } from './feed.component';
import { FeedTimelineComponent } from './feed-timeline/feed-timeline.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { LoginUserResolverService } from '../users/services/login-user-resolver.service';


const routes: Routes = [
    {path:'feed', component:FeedComponent, canActivate:[AuthGuard], 
    runGuardsAndResolvers: 'always',
    resolve:{loginUser:LoginUserResolverService}, 
    children:[
        {path:'', component:FeedTimelineComponent}, 
    ]},
    
    {path:'post/:id', canActivate:[AuthGuard], runGuardsAndResolvers: 'always', component:PostDetailComponent}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    providers:[LoginUserResolverService],
    exports:[RouterModule]
})
export class FeedRoutingModule{}