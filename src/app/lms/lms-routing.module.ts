import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { LmsComponent } from './lms.component';
import { LoginUserResolverService } from '../users/services/login-user-resolver.service';

const routes: Routes = [
    {path:'lms', component:LmsComponent,  canActivate:[AuthGuard], resolve:{loginUser:LoginUserResolverService} }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class LmsRoutingModule{
  
}