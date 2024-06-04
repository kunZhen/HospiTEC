import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  // Rutas definidas en routing anteriormente
  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list'},
    { label: 'Añadir paciente', icon: 'add', url: './new-patient'},
    { label: 'Añadir hoja clínica', icon: 'add', url: './new-record'},
    { label: 'Buscar', icon: 'search', url: './search'},
  ]

}
