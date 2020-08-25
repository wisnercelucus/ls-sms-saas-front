import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { LmsComponent } from './lms.component';
import { LoginUserResolverService } from '../users/services/login-user-resolver.service';
import { ClassroomComponent } from './classroom/classroom.component';

const routes: Routes = [
    {path:'classrooms', component:LmsComponent,  canActivate:[AuthGuard], resolve:{loginUser:LoginUserResolverService},
    children:[
        {path:':name', component:ClassroomComponent}
    ] }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class LmsRoutingModule{
  
}