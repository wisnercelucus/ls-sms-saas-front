import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForumComponent } from './forum.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ForumComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
  ]
})
export class ForumModule { }