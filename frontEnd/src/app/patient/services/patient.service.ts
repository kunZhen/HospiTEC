import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from 'src/environments/environments';
import { Patient } from '../interfaces/patient.interface';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);
  httpParams: any;

  constructor() { }

  getPatients(): Observable<Patient[]> {
    const url = `${this.baseUrl}/heroes`;

    return this.http.get<Patient[]>(url);
  }

  getPatientById(id: string): Observable<Patient | undefined> {
    const url = `${this.baseUrl}/heroes/${id}`;

    return this.http.get<Patient>(url)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

}
