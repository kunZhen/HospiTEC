import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  // Rutas definidas en routing anteriormente
  public sidebarItems = [
    { label: 'Salones', icon: 'label', url: './salon'},
    { label: 'Añadir salón', icon: 'add', url: './new-salon'},
    { label: 'Equipo médico', icon: 'label', url: './equipment'},
    { label: 'Añadir equipo médico', icon: 'add', url: './new-equipment'},
    { label: 'Equipo cama', icon: 'label', url: './bed'},
    { label: 'Añadir cama', icon: 'add', url: './new-bed'},
    { label: 'Procedimientos médicos', icon: 'label', url: './procedure'},
    { label: 'Añadir procedimiento', icon: 'add', url: './new-procedure'},
    { label: 'Personal', icon: 'label', url: './staff'},
    { label: 'Añadir personal', icon: 'add', url: './new-staff'},
    // { label: 'Añadir hoja clínica', icon: 'add', url: './new-record'},
    // { label: 'Buscar', icon: 'search', url: './search'},
  ]


  constructor(  private authService: AuthService,
    private router: Router
  ) { }

  /**
   * This function returns the current user authenticated by the authService, or undefined if no user
   * is authenticated.
   * @returns The `get user()` method is returning the current user authenticated by the `authService`,
   * which is of type `User` or `undefined` if there is no authenticated user.
   */
  get user(): User | undefined {
    return this.authService.currentUser;
  }

  /**
   * The `onLogout` function logs out the user and navigates to the login page.
   */
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}


