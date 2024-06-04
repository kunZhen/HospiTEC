import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);
  httpParams: any;

  private user?: User;

  constructor() { }

  get currentUser(): User | undefined {
    if ( !this.user ) return undefined;
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/doctor?email=${email}&password=${password}`;

    return this.http.get<User[]>(url)
      .pipe(
        tap(users => {
          if (users.length > 0) {
            this.user = users[0];
            localStorage.setItem('token', this.user.id);
          }
        }),
        map(users => users.length > 0)
      );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }


  checkAuthentication(): Observable<boolean> | boolean {

    if (!localStorage.getItem('token')) return false;

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.baseUrl}/doctor/${token}`)
    .pipe(
      tap( user => this.user = user),
      map( user => !!user),
      catchError( err => of(false) )
    );
  }


}
