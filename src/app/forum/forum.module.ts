import { NgModule, Directive, AfterViewInit, ElementRef } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForumComponent } from './forum.component';
import { RouterModule } from '@angular/router';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { ForumSideMenuComponent } from './forum-side-menu/forum-side-menu.component';
import { QuestionItemComponent } from './question-item/question-item.component';
import { QuestionFeedComponent } from './question-feed/question-feed.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ContributeComponent } from './contribute/contribute.component';
import { ContributorsComponent } from './contributors/contributors.component';
import { BrowserModule } from '@angular/platform-browser';
/*
var hljs:any;

@Directive({
  selector: 'pre'
})
class PreHighlight implements AfterViewInit {
  constructor(public elRef: ElementRef) {}

  ngAfterViewInit() {
    hljs.highlightBlock(this.elRef.nativeElement);
  }
}  
*/

@NgModule({
  declarations: [
    ForumComponent,
    QuestionDetailComponent,
    ForumSideMenuComponent,
    QuestionItemComponent,
    QuestionFeedComponent,
    CategoryListComponent,
    ContributeComponent,
    ContributorsComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    BrowserModule
  ]
})
export class ForumModule { }