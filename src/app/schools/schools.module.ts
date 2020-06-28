import { NgModule } from '@angular/core';
import { SchoolsComponent } from './schools.component';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
import { SchoolRoutingModule } from './schools-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RootComponent } from './root/root.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InformationComponent } from './information/information.component';

@NgModule({
  declarations: [
    SchoolsComponent,
    AdminComponent, 
    RootComponent, 
    DashboardComponent, 
    InformationComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    SchoolRoutingModule,
  ]
})
export class SchoolsModule { }
