import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-laboratorio',
  templateUrl: './laboratorio.component.html',
  styleUrls: ['./laboratorio.component.css']
})
export class LaboratorioComponent implements OnInit {
  public prestaciones; 
  public prestacion;
  public prestacionSeleccionada=[];
  public citaReservada:any=null;
  constructor(
    public UsuarioService:UsuarioService
  ) { }

  ngOnInit() {
    this.UsuarioService.DisparaPrestacion.subscribe((resp:any)=>{
      console.log("respuesta disparador", resp);
      this.buscarPrestaciones(resp);
    });
  }

  buscarPrestaciones(datos){


    this.UsuarioService.prestacionByGrupo(datos).subscribe((resp:any)=>{
        if(resp.codigo ==200){
          this.prestaciones= resp.data;
          console.log("prestaciones", this.prestaciones);

        }
        if(resp.codigo !=200){

        }
    });
  }

  cambiaPrestacion(pres_id){
    this.prestacion = this.prestaciones.find(pr => pr.id == pres_id)

  }

  agregarPrestacion(){
    if(this.prestacion){
      this.prestacionSeleccionada.push(this.prestacion)

    }
  }

  enviarPrestaciones(){
    console.log("envio ", this.prestacionSeleccionada);
    if(this.prestacionSeleccionada.length != 0){
      const data={
        prestaciones: this.prestacionSeleccionada,
      }
      this.UsuarioService.DisparadorCitasReservada.emit({ data:data });

    }
    if(this.prestacionSeleccionada.length == 0){
      console.log("no envio nada");
    }
  }
  

}
