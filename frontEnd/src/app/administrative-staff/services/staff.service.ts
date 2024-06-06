import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Personal } from '../interfaces/personal.interface';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);
  httpParams: any;

  constructor() { }

  getStaff(): Observable<Personal[]> {
    const url = `${this.baseUrl}/personal`;

    return this.http.get<Personal[]>(url);
  }

  getStaffById(id: string): Observable<Personal | undefined> {
    const url = `${this.baseUrl}/personal/${id}`;

    return this.http.get<Personal>(url)
    .pipe(
      catchError( error => of(undefined) )
    );
  }

  createStaff(staff: Personal): Observable<Personal> {
    const url = `${this.baseUrl}/personal`;

    return this.http.post<Personal>(url, staff);
  }

  updateStaff(staff: Personal): Observable<Personal> {
    const url = `${this.baseUrl}/personal/${staff.id}`;

    return this.http.put<Personal>(url, staff);
  }

  deleteStaff(id: string) {
    const url = `${this.baseUrl}/personal/${id}`;

    return this.http.delete(url)
    .pipe(
      catchError( error => of(false) ),
      map(resp => true)
    );
  }
}
