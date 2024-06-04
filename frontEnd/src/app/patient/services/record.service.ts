import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Record } from '../interfaces/record.interface';


@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);
  httpParams: any;

  constructor() { }

  getRecordById(id: string): Observable<Record | undefined> {
    const url = `${this.baseUrl}/records/${id}`;

    return this.http.get<Record>(url)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  getRecordsByPatientId(id: string): Observable<Record[] | undefined> {
    const url = `${this.baseUrl}/records?patientId=${id}`;

    return this.http.get<Record[]>(url)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  addRecord(record: Record): Observable<Record> {
    const url = `${this.baseUrl}/records`;

    return this.http.post<Record>(url, record);
  }

  updateRecord(record: Record): Observable<Record> {
    const url = `${this.baseUrl}/records/${record.id}`;

    return this.http.put<Record>(url, record);
  }

  deleteRecordById(id: string) {
    const url = `${this.baseUrl}/records/${id}`;

    return this.http.delete(url)
      .pipe(
        catchError( err => of(false)),
        map(resp => true)
      );
  }
}
