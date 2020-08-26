import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LmsComponent } from './lms.component';
import { TermsOverviewComponent } from './terms-overview/terms-overview.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CalendarEventsComponent } from './calendar-events/calendar-events.component';
import { ModeratorsComponent } from './moderators/moderators.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SharedModule } from '../shared/shared.module';
import { ClassroomComponent } from './classroom/classroom.component';
import { CourseItemComponent } from './course-list/course-item/course-item.component';
import { ModeratorComponent } from './moderators/moderator/moderator.component';
import { CourseItemOddComponent } from './course-list/course-item-odd/course-item-odd.component';
import { CourseDetailComponent } from './course-list/course-detail/course-detail.component';
import { CourseSyllabusComponent } from './course-list/course-detail/course-syllabus/course-syllabus.component';
import { CourseWikiComponent } from './course-list/course-detail/course-wiki/course-wiki.component';

@NgModule({
  declarations: [
    LmsComponent,
    TermsOverviewComponent,
    CourseListComponent,
    CalendarEventsComponent,
    ModeratorsComponent,
    ClassroomComponent,
    CourseItemComponent,
    ModeratorComponent,
    CourseItemOddComponent,
    CourseDetailComponent,
    CourseSyllabusComponent,
    CourseWikiComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  exports:[
    SharedModule,
    FlatpickrModule,
    //NgbModalModule,
    CalendarModule
  ]
})
export class LmsModule { }
