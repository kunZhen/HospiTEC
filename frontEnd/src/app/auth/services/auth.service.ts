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
  private readonly baseUrlprod: string = environments.baseUrlprod;
  private http = inject(HttpClient);
  httpParams: any;

  private user?: User;

  constructor() { }

  get currentUser(): User | undefined {
    if ( !this.user ) return undefined;
    return structuredClone(this.user);
  }

  logInDoctor(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/doctor?email=${email}&password=${password}`;

    return this.http.get<User[]>(url)
      .pipe(
        tap(users => {
          if (users.length > 0) {
            this.user = users[0];
            localStorage.setItem('token', this.user.identification_number);
          }
        }),
        map(users => users.length > 0)
      );
  }

  logInPatient(email: string, password: string) {
    const url = `${this.baseUrlprod}/patient/login/${email}/${password}`;

    return this.http.get<User>(url)
      .pipe(
        tap(users => {
          if (users) {
            this.user = users;
            localStorage.setItem('token', this.user.identification_number);
            console.log(users);
          }
        }),
        map(users => !!users)
      );
  }

  loginPatient2(email: string, password: string) {
    const url = `${this.baseUrlprod}/patient/login/${email}/${password}`;

    return this.http.get(url);

  }

  logInAdmin(email: string, password: string) {
    const url = `${this.baseUrl}/admin?email=${email}&password=${password}`;

    return this.http.get<User[]>(url)
      .pipe(
        tap(users => {
          if (users.length > 0) {
            this.user = users[0];
            localStorage.setItem('token', this.user.identification_number);
          }
        }),
        map(users => users.length > 0)
      );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }


  checkAuthentication(): Observable<boolean> {

    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.baseUrl}/doctor/${token}`)
    .pipe(
      tap( user => this.user = user),
      map( user => !!user),
      catchError( err => of(false) )
    );
  }


}
