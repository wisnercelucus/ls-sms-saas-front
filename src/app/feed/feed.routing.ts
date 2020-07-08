import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { FeedComponent } from './feed.component';
import { AuthGuard } from '../auth/auth.guard';
import { FeedTimelineComponent } from './feed-timeline/feed-timeline.component';


const routes: Routes = [
    {path:'feed', component:FeedComponent, canActivate:[AuthGuard], children:[
        {path:'', component:FeedTimelineComponent}, 
    ]}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class FeedRoutingModule{}