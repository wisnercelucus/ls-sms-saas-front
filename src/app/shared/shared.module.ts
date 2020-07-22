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
import { FeedCopyrightComponent } from './feed-copyright/feed-copyright.component';
import { UsersSuggestionsComponent } from './users-suggestions/users-suggestions.component';
import { GroupsSuggestionsComponent } from './groups-suggestions/groups-suggestions.component';
import { PublishModalFormComponent } from './publish-modal-form/publish-modal-form.component';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { DataTableRowHeaderComponent } from './data-table-row-header/data-table-row-header.component';
import { PostShareModalFormComponent } from './post-share-modal-form/post-share-modal-form.component';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';
import { PostReportDialogComponent } from './post-report-dialog/post-report-dialog.component';

@NgModule({
    declarations:[
        AlertDialogComponent, 
        LoadingSpinnerComponent,
        MinBannerComponent,
        FooterComponent,
        FeedSideMenuComponent,
        FeedCopyrightComponent,
        UsersSuggestionsComponent,
        GroupsSuggestionsComponent,
        PublishModalFormComponent,
        FormDialogComponent,
        DataTableRowHeaderComponent,
        PostShareModalFormComponent,
        DeleteConfirmDialogComponent,
        PostReportDialogComponent,
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
            FeedCopyrightComponent,
            UsersSuggestionsComponent,
            GroupsSuggestionsComponent,
            PublishModalFormComponent,
            DataTableRowHeaderComponent
        ]
}
)
export class SharedModule{

}