import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RecordPageComponent } from './pages/record-page/record-page.component';
import { NewReservationPageComponent } from './pages/new-reservation-page/new-reservation-page.component';
import { ReservationPageComponent } from './pages/reservation-page/reservation-page.component';
import { GradePageComponent } from './pages/grade-page/grade-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'new-reservation', component: NewReservationPageComponent },
      { path: 'reservation', component: ReservationPageComponent },
      { path: 'reservation/edit/:id', component: NewReservationPageComponent },
      { path: 'records', component: RecordPageComponent },
      { path: 'records/grade/:id', component: GradePageComponent },
      { path: '**', redirectTo: 'records'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientUserRoutingModule { }
