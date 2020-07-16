import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { FeedComponent } from './feed.component';
import { AuthGuard } from '../auth/auth.guard';
import { FeedTimelineComponent } from './feed-timeline/feed-timeline.component';
import { PostDetailComponent } from './post-detail/post-detail.component';


const routes: Routes = [
    {path:'feed', component:FeedComponent, canActivate:[AuthGuard], children:[
        {path:'', component:FeedTimelineComponent}, 
    ]},
    
    {path:'post/:id', canActivate:[AuthGuard], component:PostDetailComponent}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class FeedRoutingModule{}