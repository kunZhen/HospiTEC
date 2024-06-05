import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from 'src/environments/environments';
import { Bed } from '../interfaces/bed.interface';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BedService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);
  httpParams: any;

  constructor() { }

  getBed(): Observable<Bed[]> {
    const url = `${this.baseUrl}/bed`;

    return this.http.get<Bed[]>(url);
  }

  getBedById(id: string): Observable<Bed | undefined> {
    const url = `${this.baseUrl}/bed/${id}`;

    return this.http.get<Bed>(url)
    .pipe(
      catchError( error => of(undefined) )
    );
  }

  createBed(bed: Bed): Observable<Bed> {
    const url = `${this.baseUrl}/bed`;

    return this.http.post<Bed>(url, bed);
  }

  updateBed(bed: Bed): Observable<Bed> {
    const url = `${this.baseUrl}/bed/${bed.id}`;

    return this.http.put<Bed>(url, bed);
  }

  deleteBed(id: string) {
    const url = `${this.baseUrl}/bed/${id}`;

    return this.http.delete(url)
    .pipe(
      catchError( error => of(false) ),
      map( resp => true )
    );
  }
}
