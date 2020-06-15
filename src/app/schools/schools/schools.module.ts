import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolsComponent } from '../schools.component';
import { AdminComponent } from '../admin/admin.component';
import { RouterModule } from '@angular/router';
import { SchoolRoutingModule } from '../schools-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SchoolsComponent,
    AdminComponent, 
  ],
  imports: [
    SharedModule,
    RouterModule,
    SchoolRoutingModule,
  ]
})
export class SchoolsModule { }
