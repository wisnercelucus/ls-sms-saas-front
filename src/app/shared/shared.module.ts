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
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { QuillModule } from 'ngx-quill'

import 'quill-emoji/dist/quill-emoji.js'


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
        FontAwesomeModule,
        CarouselModule,
        CKEditorModule,
        QuillModule.forRoot({
            modules: {
              syntax: false,
              'emoji-shortname': true,
              'emoji-toolbar': true,
              'formula':true,
              toolbar: [
                ['bold', 'italic', 'underline'],        // toggled buttons
                ['blockquote', 'code-block'],
            
                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'color': [] }, 'formula'],                         // text direction
            
                //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            
                //[{ 'color': [] }, 'link', 'emoji'],          // dropdown with defaults from theme
                //[{ 'font': [] }],
                //[{ 'align': [] }],
            
                //['clean'],                                         // remove formatting button
            
                ['link', 'emoji'],  
                //['formula']                        // link and image, video
              ]
            }
          })
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
            DataTableRowHeaderComponent,
            CarouselModule,
            CKEditorModule,
            QuillModule
        ]
}
)
export class SharedModule{

}