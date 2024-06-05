import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Equipment } from '../interfaces/equipment.interface';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);
  httpParams: any;

  constructor() { }

  getEquipment(): Observable<Equipment[]> {
    const url = `${this.baseUrl}/equipment`;

    return this.http.get<Equipment[]>(url);
  }

  getEquipmentById(id: string): Observable<Equipment | undefined> {
    const url = `${this.baseUrl}/equipment/${id}`;

    return this.http.get<Equipment>(url)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  createEquipment(equipment: Equipment): Observable<Equipment> {
    const url = `${this.baseUrl}/equipment`;

    return this.http.post<Equipment>(url, equipment);
  }

  updateEquipment(equipment: Equipment): Observable<Equipment> {
    const url = `${this.baseUrl}/equipment/${equipment.id}`;

    return this.http.put<Equipment>(url, equipment);
  }

  deleteEquipment(id: string) {
    const url = `${this.baseUrl}/equipment/${id}`;

    return this.http.delete(url)
      .pipe(
        catchError( error => of(false) ),
        map(resp => true)
      );
  }
}
