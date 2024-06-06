import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Procedure } from '../interfaces/procedure.interface';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);
  httpParams: any;

  constructor() { }

  getProcedure(): Observable<Procedure[]> {
    const url = `${this.baseUrl}/procedure`;

    return this.http.get<Procedure[]>(url);
  }

  getProucedureById(id: string): Observable<Procedure | undefined> {
    const url = `${this.baseUrl}/procedure/${id}`;

    return this.http.get<Procedure>(url)
    .pipe(
      catchError( error => of(undefined) )
    );
  }

  createProcedure(procedure: Procedure): Observable<Procedure> {
    const url = `${this.baseUrl}/procedure`;

    return this.http.post<Procedure>(url, procedure);
  }

  updateProcedure(procedure: Procedure): Observable<Procedure> {
    const url = `${this.baseUrl}/procedure/${procedure.name}`;

    return this.http.put<Procedure>(url, procedure);
  }

  deleteProcedure(id: string) {
    const url = `${this.baseUrl}/procedure/${id}`;

    return this.http.delete(url)
    .pipe(
      catchError( error => of(false) ),
      map(resp => true)
    );
  }
}
