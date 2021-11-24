import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabla-resultados',
  templateUrl: './tabla-resultados.component.html',
  styleUrls: ['./tabla-resultados.component.scss']
})
export class TablaResultadosComponent implements OnInit {
  public monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Deciembre'];

  @Input() citas:any ='sin citas disponibles';
  constructor() { }

  ngOnInit() {
  }

}
