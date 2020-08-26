import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { LmsComponent } from './lms.component';
import { LoginUserResolverService } from '../users/services/login-user-resolver.service';
import { ClassroomComponent } from './classroom/classroom.component';
import { CourseDetailComponent } from './course-list/course-detail/course-detail.component';
import { MillestoneOverviewComponent } from './course-list/course-detail/course-overview/millestone-overview/millestone-overview.component';
import { CourseModuleComponent } from './course-list/course-detail/course-module/course-module.component';
import { CourseModulLessonComponent } from './course-list/course-detail/course-module/course-modul-lesson/course-modul-lesson.component';

const routes: Routes = [
    {path:'classrooms', component:LmsComponent,  canActivate:[AuthGuard], resolve:{loginUser:LoginUserResolverService},
    children:[
        {path:'course/:course-id', component:CourseDetailComponent,
        children:[
            {path:':millestone', component:MillestoneOverviewComponent},
            {path:':millestone/:module', component:CourseModuleComponent}
        ]
        },
        {path:':classroomName/:group', component:ClassroomComponent},
        {path:'course/:course-id/:millestone/:module', component:CourseModuleComponent,
        children:[
            {path:'lesson/:lesson_id', component:CourseModulLessonComponent}
        ]}
    ] }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class LmsRoutingModule{
  
}