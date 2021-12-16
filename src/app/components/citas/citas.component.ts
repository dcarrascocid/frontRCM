import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { UtilService } from '../../services/util.service';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import {Router} from '@angular/router';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {
  public token=null;
  public pres_id=null;
  public prestadores:any=null;
  public especialidades:any =null;
  public profesionales:any=null;
  public prestaciones:any=null;
  public prestacion:any=null;
  public regiones:any =null;
  public comunas:any =null;
  public sucursal:any =null;
  public profesional=null;
  public especialidad=null;
  public prestador=null;
  public citas:any=null;
  public datosReserva:any;
  fecha =new Date;
  public botonEnviar:boolean=false;
  public fechaInicio = moment(this.fecha).format('YYYY-MM-DD');
  public ultimoDia  = new Date(this.fecha.getFullYear(), this.fecha.getMonth() + 1, 0);
  public fechaTermino=moment(this.ultimoDia).format('YYYY-MM-DD');
  
  fecha1 = new FormControl(this.fechaInicio, []); 
  fecha2 = new FormControl(this.fechaTermino, []); 
  public consultaForm: FormGroup;
  public pacienteForm:FormGroup;
  public prestacionFonasa;
  public codigoFonosa;
  public citasReservadas:any;
  public calendar:boolean=false;


  constructor(
    private formBuilder :FormBuilder,
    public UsuarioService :UsuarioService,
    public Utils: UtilService,
    private modalService:NgbModal,
    private spinner: NgxSpinnerService,
    private router:Router
    
    ) { 
      this.consultaForm = this.formBuilder.group({
        rut:[''],
        tipoDoc:[1],
        id_encuentro:null  
      });

      this.pacienteForm = this.formBuilder.group({
        res_tipo_doc:null,
        res_numerodocumento:null,
        res_numdocdv:null,
        res_monbres:null,
        res_paterno:null,
        res_materno:null,
        res_correo:null,
        res_telefono:null,

      });


  }

  ngOnInit() {
    this.spinner.show();
    this.obetnerToken();
    this.BuscaSucursalesByPrestador();
    // this.fechas();
    this.buscaPrestacion();
    this.buscarPrestacinesFonasa();
    this.updateEvents();
    this.spinner.hide();
  }

  get revItemForm(){
    return this.consultaForm.controls;
  }

  BuscaSucursalesByPrestador(){
      this.UsuarioService.BuscaSucursalesByPrestador().subscribe((resp:any)=>{
      if(resp.codigo == 200){
        this.prestadores = resp.data;
      }
      if(resp.codigo!= 200){
        Swal.fire({
          title: 'Error!',
          text: resp.mensaje,
          icon: 'error',
          confirmButtonText: 'Cerrar'
        })
      }

    });
  }


  cambiaSucursal(suc_id){
    if(suc_id){
      this.buscarRegionbySucursal(50);
    }
    if(!suc_id){}
  }
  


  //CAMBIOS EN LISTAS
  cambiaPrestador(pre_id){
    if(pre_id){
      this.prestador=pre_id;
      this.buscarRegionbySucursal(pre_id);
      this.UsuarioService.buscaEspecialidadesPrestador(pre_id).subscribe((resp:any)=>{
          this.especialidades=resp.data;
        });
 

    }
  }
  


  fechas(){
    
    const date = new Date();
     const primerDia = date;

    //  const primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
     const ultimoDia  = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.fechaInicio = moment(primerDia).format('YYYY-MM-DD');
      this.fechaTermino = moment(ultimoDia).format('YYYY-MM-DD');

     
    }

  enviar(content){

    this.modalService.open(content, { size: 'lg' });

  }


  obetnerToken(){
      this.UsuarioService.getToken().subscribe((data:any)=>{

        if(!data.data){
          Swal.fire({
            title: 'Error!',
            text: data.data,
            icon: 'error',
            confirmButtonText: 'Cerrar'
          })
        }
        this.token = data.data;

      })
  }


  
  buscaEspecialidades(){
    this.UsuarioService.buscaEspecialidades().subscribe((resp:any)=>{
      this.especialidades= resp.data;
      console.log("especilaidades",this.especialidades);

    });
  }

  buscaSucursales(pre_id){
  
    // this.UsuarioService.buscaEspecialidades(pre_id).subscribe((resp:any)=>{
    //   this.especialidades= resp.data;
    //   console.log("especilaidades",this.especialidades);

    // });
  }




  validarRut()
  {
    if(!this.Utils.validateRun( this.consultaForm.value.rut)) 
    {
      this.consultaForm.controls.rut.setErrors({'invalido': true});
    }
  }


 cambiaRegion(reg_idregion){
  if(reg_idregion){
    this.buscaComunaPrestador(reg_idregion);
  }

 }

 cambiaComuna(com_idcomuna){
   if(!this.especialidades){
     this.buscaEspecialidadporComuna(com_idcomuna);
   }

 }


cambiaEspecialidad(esp_idespecialidad){
  this.especialidad=esp_idespecialidad;
    this.buscaRegionXEspecialidad(esp_idespecialidad);
    this.buscarProfespecialidad(esp_idespecialidad);
  }

cambiaProfesional(pro_idprofesional){
  this.profesional=pro_idprofesional
    this.BuscaCitasDisponibles(pro_idprofesional);
}

BuscaRegionPrestador(pre_id){
  
    this.UsuarioService.BuscaRegionPrestador(pre_id).subscribe((resp:any)=>{
      this.regiones= resp.data;

    });
}

buscarRegionbySucursal(suc_id){
  this.UsuarioService.buscarRegionbySucursal(suc_id).subscribe((resp:any)=>{
    if(resp.codigo == 200){
      this.regiones= resp.data;
    }
    if(resp.codigo != 200){
    console.log("suc false");
    }
  })
}


buscaComunaPrestador(reg_idregion){
    this.UsuarioService.buscaComunaPrestador(reg_idregion).subscribe((resp:any)=>{
      this.comunas= resp.data;

    });

}

buscaEspecialidadporComuna(com_idcomuna){
  this.UsuarioService.buscaEspecilidadeComuna(com_idcomuna).subscribe((resp:any)=>{
    this.especialidades= resp.data;

  });
}

buscaRegionXEspecialidad(esp_idespecialidad){
  this.UsuarioService.buscaRegionXEspecialidad(esp_idespecialidad).subscribe((resp:any)=>{
    this.regiones= resp.data;


  });
}

buscarProfespecialidad(esp_idespecialidad){
  this.UsuarioService.buscarProfespecialidad(esp_idespecialidad).subscribe((resp:any)=>{
    
    if(resp.data.length ==0){
      Swal.fire({
        title: 'Error!',
        text: resp.mensaje,
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    }
      this.profesionales= resp.data;

  });
}

BuscaCitasDisponibles(pro_idprofesional){

}


buscaPrestacion(){
  
  this.UsuarioService.buscaPrestacionAll().subscribe((resp:any)=>{
    this.prestaciones= resp.data;


  });
}

cambiaPrestacion(pres_id){
if(pres_id){
  this.prestacion=pres_id
}

}

buscarCita(){
  this.spinner.show();

  if(!this.prestador || !this.prestacion || !this.especialidad ){
    Swal.fire({
      title: 'Error!',
      text: 'Faltan datos para la busqueda',
      icon: 'error',
      confirmButtonText: 'Cerrar'
    });

  }
    const data={
      pre_id:this.prestador,
      esp_id:this.especialidad,
      fecha_inicio:this.fecha1.value,
      fecha_termino:this.fecha2.value,
      profesionales:this.profesionales,
      pres_idprestacion:this.prestacion,
      id_pro:null
    }; 
    

    if(this.profesional){
      data.id_pro =this.profesional;
      this.UsuarioService.buscaCitasDisponiblesProf(data).subscribe((resp:any)=>{
    if(resp.codigo != 200){
      Swal.fire({
        title: 'Error!',
        text: resp.mensaje,
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    }
    this.citas=resp.data
  
            });
    }
    if(!this.profesional && this.profesionales){

      this.UsuarioService.buscaCitasDisponiblesAll(data).subscribe((resp:any)=>{
        if(resp.data.length ==0){
          Swal.fire({
            title: 'Error!',
            text: resp.mensaje,
            icon: 'error',
            confirmButtonText: 'Cerrar'
          });
        }
        this.citas=resp.data
        this.UsuarioService.DisparadorCitas.emit({
          data:this.citas
        })
        console.log("citas", this.citas);
  
      });
            
  
    }
  
 this.spinner.hide();

  
}

cambiaFecha(datos){
  console.log("datos", datos.value);
  console.log("datos", JSON.parse(JSON.stringify(datos.name)));
}

cambiaVer(data){
  if(data==2){

    this.fecha.setDate(this.fecha.getDate() - this.fecha.getDay());
    const first = new Date(this.fecha);
    const  last = new Date(this.fecha);
    last.setDate(last.getDate()+6);

    console.log("fecha1 ",first);
    console.log("fecha1 ",last);

}
if(data ==1){
  console.log("ver semana");
}
}

// reservaCitaTemporal(datos){
//   this.UsuarioService.reservaCitaTemp(datos, estado).subscribe((resp:any)=>{
//     console.log("TESTER CITAS::::::", resp);
//     this.datosReserva.fechaCita=resp.data.agen_dia;
//     this.datosReserva.fechaHora=resp.data.agen_hora;
//     this.datosReserva.prof=resp.data.prof;
//     this.datosReserva.espe=resp.data.espe;
//     this.datosReserva.idcita=resp.data.agen_idagenda;

//   });
// }

buscarPrestacinesFonasa(){
  this.UsuarioService.prestacionesfonasa().subscribe((resp:any)=>{
    this.prestacionFonasa= resp.data;
  });
}


cambiaPrestacionFonasa(id){
this.codigoFonosa=id;

}

updateEvents() {
  this.UsuarioService.DisparadorCitasReservada.subscribe( (resp:any) =>{
    if(resp.data){
        this.citasReservadas=resp.data;// this.events =data.data;
        this.botonEnviar = true;
    }
  });
}

buscarBeneficiario(content, content1){
  console.log("content", content);
  console.log("content2", content1);
  this.spinner.show();
  // this.reservaCitaTemporal(this.)
  if(!this.citasReservadas){
    this.spinner.hide();
    Swal.fire({
      title: 'Error!',
      text: 'Debe seleccionar una cita disponible',
      icon: 'error',
      confirmButtonText: 'Cerrar'
    });
  }
  const data ={
    rut:this.consultaForm.value.rut
  };

  if(!data.rut){
    this.spinner.hide();
    Swal.fire({
      title: 'Error!',
      text: 'Debe Ingrear su RUT o Documento',
      icon: 'error',
      confirmButtonText: 'Cerrar'
    });
  }

  if(this.consultaForm.value.tipoDoc ==1){//es rut 
    this.UsuarioService.buscarbeneficiario(data).subscribe((resp:any)=>{
      console.log("BUSCA BENE::",resp);
        if(resp.codigo == 200){ // es fonasa
          this.citasReservadas.idEncuentroMedico= resp.idEncuentroMedico;
          this.citasReservadas.beneficiario = resp.data.beneficiario.nombres +' '+ resp.data.beneficiario.apellidos;
          this.citasReservadas.run = resp.data.beneficiario.run;
          this.citasReservadas.tramo =resp.data.beneficiario.tramo;
                  this.UsuarioService.valorizarPrestacion(resp, this.citasReservadas.codigo).subscribe((ret:any)=>{
                   if(ret.codigo == 200){ 
                    console.log("RET:::", ret);
                  this.citasReservadas.nivel = ret.data.bonoValorizado.nivel;
                  this.citasReservadas.valortotal = ret.data.bonoValorizado.prestacionesValorizadas[0].montoTotal;
                  this.citasReservadas.copago =ret.data.bonoValorizado.prestacionesValorizadas[0].montoCopago;
                  this.citasReservadas.bonificacion =  ret.data.bonoValorizado.prestacionesValorizadas[0].montoBonificado;
                  this.spinner.hide();
                  this.modalService.open(content, { size: 'lg' });
                  }
                  if(ret.codigo != 200){
                    this.spinner.hide();
                    Swal.fire({
                      title: 'Error!',
                      text: "No se pudop valorizar la prestación",
                      icon: 'error',
                      confirmButtonText: 'Cerrar'
                    });
                  }
                  });

        }
        if(resp.codigo != 200 ){//no es fonasa
          this.spinner.hide();
          // Swal.fire({
          //   title: 'Error!',
          //   text: resp.mensaje,
          //   icon: 'error',
          //   confirmButtonText: 'Cerrar'
          // });
          this.modalService.open(content1, { size: 'lg' });
        }       

    });

  }
  if(this.consultaForm.value.tipoDoc == 2 ){ //direrente a rut
    this.spinner.hide();
    Swal.fire({
      title: 'Error!',
      text: 'Por el momento solo debe ingresar Rut',
      icon: 'error',
      confirmButtonText: 'Cerrar'
    });
  }
  


}

confirmarPago(){
  this.spinner.show();
  this.citasReservadas;
  if(this.citasReservadas){
      this.UsuarioService.confirmarBono(this.citasReservadas).subscribe((resp:any)=>{
      if(resp.codigo == 200){
          this.citasReservadas.bono =resp.data;

          // this.UsuarioService.DisparadorReserva.emit({data:this.citasReservadas });
          localStorage.setItem("reserva",  JSON.stringify(this.citasReservadas))
          this.UsuarioService.buscarCopiaBono(resp.data.bonoValorizado.folio).subscribe((bono:any)=>{
            console.log("BONO:::", bono);
            if(bono.codigo ==200){
              window.open(bono.data.url, '_blank');
              // this.router.navigate([bono.data.url]);
            }
          })
          this.modalService.dismissAll();
          this.router.navigate(['/reservas/confirmacion']);
          this.spinner.hide();
      }
      if(resp.codigo != 200){
        this.spinner.hide();
        Swal.fire({
          title: 'Error!',
          text: 'No se pudo realizar el pago!!',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });  
      }
  })
  }
}

guradaDatosPaciente(content){
  this.spinner.show();
            const data = {
            res_tipo_doc:this.pacienteForm.value.res_tipo_doc, 
            res_numerodocumento:this.pacienteForm.value.res_numerodocumento,
            res_num_docdv:this.pacienteForm.value.res_num_docdv, 
            nombres:this.pacienteForm.value.res_nombres,
            paterno:this.pacienteForm.value.res_paterno,
            materno:this.pacienteForm.value.res_materno,
            res_correo:this.pacienteForm.value.res_correo,
            res_telefono:this.pacienteForm.value.res_telefono
            }
  this.UsuarioService.guardarPacienteParticuluar(data).subscribe((resp:any)=>{
    if(resp.data.codigo ==200){
      this.citasReservadas.beneficiario = this.pacienteForm.value.res_nombres,' ',this.pacienteForm.value.res_paterno,' ',this.pacienteForm.value.res_materno;
      this.citasReservadas.run = this.pacienteForm.value.res_numerodocumento, '-',this.pacienteForm.value.res_numdocdv;
      this.citasReservadas.tramo = 'PARTICULAR'
      this.spinner.hide();
      this.modalService.open(content, { size: 'lg' });
    }

  });
}



}

