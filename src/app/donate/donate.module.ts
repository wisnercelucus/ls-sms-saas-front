import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonateComponent } from './donate.component';
import { DonorsComponent } from './donors/donors.component';
import { MaterialModule } from '../material/material.module';
import { ProcessDonationComponent } from './process-donation/process-donation.component';

@NgModule({
    declarations:[
        DonateComponent,
        DonorsComponent,
        ProcessDonationComponent
        
    ],

    imports:[
             SharedModule,
             CommonModule,
             RouterModule,
             FormsModule,
             ReactiveFormsModule,
             MaterialModule
            ],
    }
)
export class DonateModule{}