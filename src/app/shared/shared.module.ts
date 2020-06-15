import { NgModule } from '@angular/core';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MinBannerComponent } from '../welcome/min-banner/min-banner.component';
import { FooterComponent } from '../welcome/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations:[
        AlertDialogComponent, 
        LoadingSpinnerComponent,
        MinBannerComponent,
        FooterComponent,
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
            CommonModule,
        ]
}
)
export class SharedModule{

}