import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewMedicalSalonComponent } from './pages/new-medical-salon/new-medical-salon.component';
import { ListMedicalSalonComponent } from './pages/list-medical-salon/list-medical-salon.component';
import { NewEquipmentPageComponent } from './pages/new-equipment-page/new-equipment-page.component';
import { ListEquipmentPageComponent } from './pages/list-equipment-page/list-equipment-page.component';
import { NewBedPageComponent } from './pages/new-bed-page/new-bed-page.component';
import { ListBedPageComponent } from './pages/list-bed-page/list-bed-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'new-salon', component: NewMedicalSalonComponent },
      { path: 'new-equipment', component: NewEquipmentPageComponent },
      { path: 'new-bed', component: NewBedPageComponent },
      { path: 'salon/edit/:id', component: NewMedicalSalonComponent },
      { path: 'equipment/edit/:id', component: NewEquipmentPageComponent },
      { path: 'bed/edit/:id', component: NewBedPageComponent },
      { path: 'salon', component: ListMedicalSalonComponent },
      { path: 'equipment', component: ListEquipmentPageComponent },
      { path: 'bed', component: ListBedPageComponent },
      { path: '**', redirectTo: 'salon'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativeStaffRoutingModule { }
