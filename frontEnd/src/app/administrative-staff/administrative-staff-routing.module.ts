import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewMedicalSalonComponent } from './pages/new-medical-salon/new-medical-salon.component';
import { ListMedicalSalonComponent } from './pages/list-medical-salon/list-medical-salon.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'new-salon', component: NewMedicalSalonComponent },
      { path: 'salon/edit/:id', component: NewMedicalSalonComponent },
      { path: 'salon', component: ListMedicalSalonComponent },
      { path: '**', redirectTo: 'salon'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativeStaffRoutingModule { }
