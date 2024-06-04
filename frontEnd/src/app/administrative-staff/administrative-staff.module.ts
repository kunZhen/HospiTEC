import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrativeStaffRoutingModule } from './administrative-staff-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdministrativeStaffRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdministrativeStaffModule { }
