import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirmacion-cita',
  templateUrl: './confirmacion-cita.component.html',
  styleUrls: ['./confirmacion-cita.component.scss']
})
export class ConfirmacionCitaComponent implements OnInit {
public reserva;

  constructor(
    public UsuarioService :UsuarioService,
    private spinner: NgxSpinnerService,  
    private router:Router

  ) { }

  ngOnInit() {
  this.getdatosConfirmacionCita();
  }


  getdatosConfirmacionCita(){
    this.reserva = JSON.parse(localStorage.getItem('reserva')); 
    localStorage.clear();
  }

  buscarBono(){
 this.spinner.show();
        if(!this.reserva){
          Swal.fire({
            title: 'Error!',
            text: 'No existe copia de bono',
            icon: 'error',
            confirmButtonText: 'Cerrar'
          });
        }
        this.UsuarioService.buscarCopiaBono(this.reserva.bono.bonoValorizado.folio).subscribe((resp:any)=>{
          if(resp.codigo == 200){
            this.spinner.hide();
            window.open(resp.data.url, '_blank');
          }
          if(resp.codigo != 200){
            Swal.fire({
              title: 'Error!',
              text: resp.data.mensaje,
              icon: 'error',
              confirmButtonText: 'Cerrar'
            });
          }
            })
  }

  volver(){
    this.router.navigate(['/reservas/citas']);
  }

}
