import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForumComponent } from './forum.component';
import { RouterModule } from '@angular/router';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { ForumSideMenuComponent } from './forum-side-menu/forum-side-menu.component';
import { QuestionItemComponent } from './question-item/question-item.component';
import { QuestionFeedComponent } from './question-feed/question-feed.component';


@NgModule({
  declarations: [
    ForumComponent,
    QuestionDetailComponent,
    ForumSideMenuComponent,
    QuestionItemComponent,
    QuestionFeedComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
  ]
})
export class ForumModule { }