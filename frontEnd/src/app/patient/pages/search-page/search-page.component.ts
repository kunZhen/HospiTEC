import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Patient } from '../../interfaces/patient.interface';
import { PatientService } from '../../services/patient.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public patients: Patient[] = [];
  public selectedPatient?: Patient;

  constructor( private patientService: PatientService ) { }


  searchPatient() {
    const value: string = this.searchInput.value || '';

    this.patientService.getSuggestions(value).subscribe( patients => {
      this.patients = patients;
    });

  }

  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    if ( !event.option.value ) {
      this.selectedPatient = undefined;
      return;
    }

    const patient: Patient = event.option.value;
    this.searchInput.setValue( patient.name );

    this.selectedPatient = patient;

  }

}
