import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-laboratorio',
  templateUrl: './laboratorio.component.html',
  styleUrls: ['./laboratorio.component.css']
})
export class LaboratorioComponent implements OnInit {

  constructor(
    public UsuarioService:UsuarioService
  ) { }

  ngOnInit() {
  this.UsuarioService.DisparaPrestacion.subscribe((resp:any)=>{
    console.log("respuesta disparador", resp);
  })
  }

  

}
