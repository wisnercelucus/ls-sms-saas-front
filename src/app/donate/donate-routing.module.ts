import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { DonorsComponent } from './donors/donors.component';
import { DonateComponent } from './donate.component';
import { ProcessDonationComponent } from './process-donation/process-donation.component';


const routes: Routes = [
    {path:'donate', component:DonateComponent, children:[
        {path:'process', component:ProcessDonationComponent},
        {path:'donors', component:DonorsComponent},  
    ]}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class DonateRoutingModule{}