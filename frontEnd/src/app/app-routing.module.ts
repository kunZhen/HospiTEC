import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    // canActivate: [PublicGuard],
    // canMatch: [PublicGuard]
  },
  {
    path: 'patient',
    loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule),
    // canActivate: [AuthGuard],
    // canMatch: [AuthGuard]
  },
  {
    path: 'patient-user',
    loadChildren: () => import('./patient-user/patient-user.module').then(m => m.PatientUserModule),
    // canActivate: [AuthGuard],
    // canMatch: [AuthGuard]
  },
  // {
  //   path: 'doctor',
  //   loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorModule)
  // },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    redirectTo: 'patient',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
