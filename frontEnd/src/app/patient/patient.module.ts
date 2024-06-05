import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { PatientRoutingModule } from './patient-routing.module';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { PatientPageComponent } from './pages/patient-page/patient-page.component';
import { CardComponent } from './components/card/card.component';
import { PatientImagePipe } from './pipes/patient-image.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientDatePipe } from './pipes/patient-date.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { RecordPageComponent } from './pages/record-page/record-page.component';
import { RecordCardComponent } from './components/record-card/record-card.component';
import { NewRecordPageComponent } from './pages/new-record-page/new-record-page.component';


@NgModule({
  declarations: [
    NewPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    SearchPageComponent,
    PatientPageComponent,
    CardComponent,
    ConfirmDialogComponent,
    RecordPageComponent,
    RecordCardComponent,
    NewRecordPageComponent,

    // Pipes
    PatientImagePipe,
    PatientDatePipe
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PatientModule { }
