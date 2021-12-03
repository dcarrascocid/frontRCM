import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-confirmacion-cita',
  templateUrl: './confirmacion-cita.component.html',
  styleUrls: ['./confirmacion-cita.component.scss']
})
export class ConfirmacionCitaComponent implements OnInit {
public reserva;
  constructor(
    public UsuarioService :UsuarioService
  ) { }

  ngOnInit() {
  this.getdatosConfirmacionCita();
  }


  getdatosConfirmacionCita(){
    console.log("BUSCAR");
    this.UsuarioService.DisparadorReserva.subscribe( (data:any) =>{
      console.log("recibiendo reserva......", data);
      this.reserva=data.data;
    });
    console.log("this.reswerva", this.reserva);

  }

  buscarBono(){
    console.log("this.", this.reserva);
        if(!this.reserva){
          Swal.fire({
            title: 'Error!',
            text: 'No exite copia de bono',
            icon: 'error',
            confirmButtonText: 'Cerrar'
          });
        }
        this.UsuarioService.buscarCopiaBono(this.reserva.folio).subscribe((resp:any)=>{

            })
  }

}
