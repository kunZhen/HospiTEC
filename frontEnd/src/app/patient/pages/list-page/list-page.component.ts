import { Component } from '@angular/core';
import { Patient } from '../../interfaces/patient.interface';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent {

  public patients: Patient[] = [];

  constructor( private patientService: PatientService ) { }

  ngOnInit(): void {
    this.patientService.getPatients().subscribe( patients => {
      this.patients = patients;
    });
  }

}
