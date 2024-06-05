import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrativeStaffRoutingModule } from './administrative-staff-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewMedicalSalonComponent } from './pages/new-medical-salon/new-medical-salon.component';
import { ListMedicalSalonComponent } from './pages/list-medical-salon/list-medical-salon.component';
import { SalonCardComponent } from './components/salon-card/salon-card.component';
import { ListEquipmentPageComponent } from './pages/list-equipment-page/list-equipment-page.component';
import { NewEquipmentPageComponent } from './pages/new-equipment-page/new-equipment-page.component';
import { EquipmentCardComponent } from './components/equipment-card/equipment-card.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    NewMedicalSalonComponent,
    ListMedicalSalonComponent,
    SalonCardComponent,
    ListEquipmentPageComponent,
    NewEquipmentPageComponent,
    EquipmentCardComponent
  ],
  imports: [
    CommonModule,
    AdministrativeStaffRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdministrativeStaffModule { }
