import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewMedicalSalonComponent } from './pages/new-medical-salon/new-medical-salon.component';
import { ListMedicalSalonComponent } from './pages/list-medical-salon/list-medical-salon.component';
import { NewEquipmentPageComponent } from './pages/new-equipment-page/new-equipment-page.component';
import { ListEquipmentPageComponent } from './pages/list-equipment-page/list-equipment-page.component';
import { NewBedPageComponent } from './pages/new-bed-page/new-bed-page.component';
import { ListBedPageComponent } from './pages/list-bed-page/list-bed-page.component';
import { NewProcedurePageComponent } from './pages/new-procedure-page/new-procedure-page.component';
import { ListProcedurePageComponent } from './pages/list-procedure-page/list-procedure-page.component';
import { NewStaffPageComponent } from './pages/new-staff-page/new-staff-page.component';
import { ListStaffPageComponent } from './pages/list-staff-page/list-staff-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'new-salon', component: NewMedicalSalonComponent },
      { path: 'new-equipment', component: NewEquipmentPageComponent },
      { path: 'new-bed', component: NewBedPageComponent },
      { path: 'new-procedure', component: NewProcedurePageComponent },
      { path: 'new-staff', component: NewStaffPageComponent },
      { path: 'salon/edit/:id', component: NewMedicalSalonComponent },
      { path: 'equipment/edit/:id', component: NewEquipmentPageComponent },
      { path: 'bed/edit/:id', component: NewBedPageComponent },
      { path: 'procedure/edit/:id', component: NewProcedurePageComponent },
      { path: 'staff/edit/:id', component: NewStaffPageComponent },
      { path: 'salon', component: ListMedicalSalonComponent },
      { path: 'equipment', component: ListEquipmentPageComponent },
      { path: 'bed', component: ListBedPageComponent },
      { path: 'procedure', component: ListProcedurePageComponent },
      { path: 'staff', component: ListStaffPageComponent },
      { path: '**', redirectTo: 'salon'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativeStaffRoutingModule { }
