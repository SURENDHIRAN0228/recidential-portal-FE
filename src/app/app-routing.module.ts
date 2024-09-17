import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MaintenanceRequestComponent } from './pages/maintenance-request/maintenance-request.component';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/maintenance-request', pathMatch: 'full' },
  //{ path: '**', redirectTo: '/maintenance-request' },
  { path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuard]},
  { path: 'maintenance-request', component: MaintenanceRequestComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
