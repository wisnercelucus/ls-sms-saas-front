import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FeedComponent } from './feed.component';
import { FeedTimelineComponent } from './feed-timeline/feed-timeline.component';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';

@NgModule({
    declarations:[
        FeedTimelineComponent,
        FeedComponent
    ],

    imports:[
             SharedModule,
             CommonModule,
             RouterModule,
             NgxLinkifyjsModule
            ],
    }
)
export class FeedModule{}