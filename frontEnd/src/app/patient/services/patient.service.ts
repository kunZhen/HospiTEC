import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from 'src/environments/environments';
import { Patient } from '../interfaces/patient.interface';
import { Observable } from 'rxjs';

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

}
