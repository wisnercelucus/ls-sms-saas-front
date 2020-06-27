import { NgModule } from '@angular/core';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MinBannerComponent } from './min-banner/min-banner.component';
import { FooterComponent } from './footer/footer.component';
import { FeedSideMenuComponent } from './feed-side-menu/feed-side-menu.component';
import { FeedTimelineComponent } from './feed-timeline/feed-timeline.component';
import { FeedCopyrightComponent } from './feed-copyright/feed-copyright.component';
import { UsersSuggestionsComponent } from './users-suggestions/users-suggestions.component';
import { GroupsSuggestionsComponent } from './groups-suggestions/groups-suggestions.component';

@NgModule({
    declarations:[
        AlertDialogComponent, 
        LoadingSpinnerComponent,
        MinBannerComponent,
        FooterComponent,
        FeedSideMenuComponent,
        FeedTimelineComponent,
        FeedCopyrightComponent,
        UsersSuggestionsComponent,
        GroupsSuggestionsComponent,
    ],

    imports:[CommonModule, 
        FormsModule, 
        ReactiveFormsModule, 
        MaterialModule, 
        FontAwesomeModule
    ],

    exports:[
            AlertDialogComponent,
            LoadingSpinnerComponent,
            MinBannerComponent,
            FooterComponent,
            FormsModule, 
            ReactiveFormsModule, 
            MaterialModule,
            CommonModule,
            FontAwesomeModule,
            FeedSideMenuComponent,
            FeedTimelineComponent,
            FeedCopyrightComponent,
            UsersSuggestionsComponent,
            GroupsSuggestionsComponent,
        ]
}
)
export class SharedModule{

}