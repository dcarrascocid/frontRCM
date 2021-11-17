import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Agenda',
      icono: 'mdi mdi-calendar-clock',
      submenu: [
        { titulo: 'Inicio', url: '/'},
        { titulo: 'Gestor', url:'gestor'},
        { titulo: 'Citas', url:'citas'},
        { titulo: 'Agenda clientes', url:'agenda'},
        { titulo: 'Gráficas', url: 'grafica1' }
      ]
    },
    {
      titulo: 'Prestadores',
      icono: 'mdi mdi-account-settings-variant',
      submenu: [
        { titulo: 'Inicio', url: '/'},
        { titulo: 'Crear', url:'prestador'},
      ]
    },
  ];

  constructor() { }
}
