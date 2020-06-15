import { NgModule } from '@angular/core';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
    declarations:[
        AlertDialogComponent, 
        LoadingSpinnerComponent
    ],

    imports:[CommonModule],

    exports:[
            AlertDialogComponent,
            LoadingSpinnerComponent,
            CommonModule,
        ]
}
)
export class SharedModule{

}