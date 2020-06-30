import { NgModule } from '@angular/core';
import { SchoolsComponent } from './schools.component';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
import { SchoolRoutingModule } from './schools-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InformationComponent } from './information/information.component';
import { SchoolRootComponent } from './school-root/school-root.component';
import { DataTableContentComponent } from './data-table-content/data-table-content.component';
import { EntitiesFormsComponent } from './entities-forms/entities-forms.component';

@NgModule({
  declarations: [
    SchoolsComponent,
    AdminComponent, 
    DashboardComponent, 
    InformationComponent, 
    SchoolRootComponent,
    DataTableContentComponent,
    EntitiesFormsComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    SchoolRoutingModule,
  ]
})
export class SchoolsModule { }
