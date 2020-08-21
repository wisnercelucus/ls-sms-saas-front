import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LmsComponent } from './lms.component';

@NgModule({
  declarations: [
    LmsComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
  ],
  exports:[

  ]
})
export class LmsModule { }
