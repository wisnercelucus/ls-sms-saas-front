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
import { UserDashboardComponent } from './school-root/user-dashboard/user-dashboard.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TodoItemComponent } from './todos-list/todo-item/todo-item.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskItemComponent } from './tasks-list/task-item/task-item.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
//import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EventDetailDialogComponent } from './shared/event-detail-dialog/event-detail-dialog.component';
import { TodoDetailDialogComponent } from './shared/todo-detail-dialog/todo-detail-dialog.component';
import { TaskDetailDialogComponent } from './shared/task-detail-dialog/task-detail-dialog.component';


@NgModule({
  declarations: [
    SchoolsComponent,
    AdminComponent, 
    DashboardComponent, 
    InformationComponent, 
    SchoolRootComponent,
    DataTableContentComponent,
    EntitiesFormsComponent,
    UserDashboardComponent,
    TodosListComponent,
    TodoItemComponent,
    TasksListComponent,
    TaskItemComponent,
    CalendarComponent,
    EventDetailDialogComponent,
    TodoDetailDialogComponent,
    TaskDetailDialogComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    SchoolRoutingModule,
    FlatpickrModule.forRoot(),
    //NgbModalModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  exports:[
    FlatpickrModule,
    //NgbModalModule,
    CalendarModule
  ]
})
export class SchoolsModule { }
