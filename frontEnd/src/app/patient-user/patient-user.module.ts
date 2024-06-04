import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientUserRoutingModule } from './patient-user-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RecordPageComponent } from './pages/record-page/record-page.component';
import { NewReservationPageComponent } from './pages/new-reservation-page/new-reservation-page.component';
import { ReservationPageComponent } from './pages/reservation-page/reservation-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    RecordPageComponent,
    NewReservationPageComponent,
    ReservationPageComponent
  ],
  imports: [
    CommonModule,
    PatientUserRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PatientUserModule { }
