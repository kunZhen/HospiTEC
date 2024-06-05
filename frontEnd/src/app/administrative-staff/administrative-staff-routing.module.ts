import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewMedicalSalonComponent } from './pages/new-medical-salon/new-medical-salon.component';
import { ListMedicalSalonComponent } from './pages/list-medical-salon/list-medical-salon.component';
import { NewEquipmentPageComponent } from './pages/new-equipment-page/new-equipment-page.component';
import { ListEquipmentPageComponent } from './pages/list-equipment-page/list-equipment-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'new-salon', component: NewMedicalSalonComponent },
      { path: 'new-equipment', component: NewEquipmentPageComponent },
      { path: 'salon/edit/:id', component: NewMedicalSalonComponent },
      { path: 'equipment/edit/:id', component: NewEquipmentPageComponent },
      { path: 'salon', component: ListMedicalSalonComponent },
      { path: 'equipment', component: ListEquipmentPageComponent },
      { path: '**', redirectTo: 'salon'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativeStaffRoutingModule { }
