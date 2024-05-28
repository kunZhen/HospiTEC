import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../../interfaces/patient.interface';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-patient-page',
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.css']
})
export class PatientPageComponent implements OnInit {

  public patient?: Patient;

  constructor(
    private patientService: PatientService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(500),
        switchMap( ({ id }) => this.patientService.getPatientById(id) )
      )
      .subscribe( patient => {

        if (!patient) return this.router.navigate([ '/patient/list' ]);

        this.patient = patient;
        console.log(this.patient);
        return;
      })
  }

  goBack():void {
    this.router.navigateByUrl('patient/list')
  }

}
