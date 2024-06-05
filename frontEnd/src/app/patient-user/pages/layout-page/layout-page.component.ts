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

  public sidebarItems = [
    { label: 'Historial Clínico', icon: 'label', url: './records'},
    { label: 'Reservaciones', icon: 'label', url: './reservation'},
    { label: 'Añadir reservación', icon: 'add', url: './new-reservation'},
  ];

  constructor(  private authService: AuthService,
    private router: Router
  ) { }

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }


}
