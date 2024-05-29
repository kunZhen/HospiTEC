import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from 'src/environments/environments';
import { Patient } from '../interfaces/patient.interface';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);
  httpParams: any;

  constructor() { }

  getPatients(): Observable<Patient[]> {
    const url = `${this.baseUrl}/patients`;

    return this.http.get<Patient[]>(url);
  }

  getPatientById(id: string): Observable<Patient | undefined> {
    const url = `${this.baseUrl}/patients/${id}`;

    return this.http.get<Patient>(url)
      .pipe(
        catchError( error => of(undefined) )
      );
  }


  getSuggestions(query: string): Observable<Patient[]>{
    return this.http.get<Patient[]>(`${this.baseUrl}/patients`)
        .pipe(
            map(patients => patients.filter(patient => patient.name.toLowerCase().includes(query.toLowerCase())))
        );
  }

  addPatient(patient: Patient): Observable<Patient> {
    const url = `${this.baseUrl}/patients`;

    return this.http.post<Patient>(url, patient);
  }

  updatePatient(patient: Patient): Observable<Patient> {
    const url = `${this.baseUrl}/patients/${patient.id}`;

    return this.http.put<Patient>(url, patient);
  }

  deletePatientById(id: string) {
    const url = `${this.baseUrl}/patients/${id}`;

    return this.http.delete(url)
      .pipe(
        catchError( err => of(false)),
        map(resp => true)
      );
  }

}
