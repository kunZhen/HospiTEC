import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Salon } from '../interfaces/salon.interface';

@Injectable({
  providedIn: 'root'
})
export class SalonService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);
  httpParams: any;

  constructor() { }

  getSalons(): Observable<Salon[]> {
    const url = `${this.baseUrl}/salon`;

    return this.http.get<Salon[]>(url);
  }
}
