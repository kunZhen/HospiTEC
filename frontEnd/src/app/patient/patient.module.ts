import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { PatientRoutingModule } from './patient-routing.module';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { PatientPageComponent } from './pages/patient-page/patient-page.component';


@NgModule({
  declarations: [
    NewPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    SearchPageComponent,
    PatientPageComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    MaterialModule
  ]
})
export class PatientModule { }
