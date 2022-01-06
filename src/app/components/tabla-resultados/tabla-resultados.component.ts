import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';

@Component({
  selector: 'app-tabla-resultados',
  templateUrl: './tabla-resultados.component.html',
  styleUrls: ['./tabla-resultados.component.scss']
})
export class TablaResultadosComponent implements OnInit {
  
  fecha =new Date;
  public horas =['08:00', '08:30','09:00', '09:30','10:00', '10:30','11:00', '11:30','12:00', '12:30','13:00', '13:30','14:00', '14:30','15:00', '15:30','16:00', '16:30','17:00', '17:30','18:00', '18:30','19:00', '19:30',]
  public diassemana =[];
  public dia= false;
  public semana =true;
  public diasSemana;
  public HorarioSemana; 
  public dias=[];
  public fechaActual;
  public citasRecibidas;
  public citasDisponibles=[];
  public citaReservada:any=null;

  @Input() citas:any ='sin citas disponibles';
  constructor(
    public UsuarioService :UsuarioService,
    private spinner: NgxSpinnerService,
  ) { }
  
  ngOnInit() {
    moment.locale('es');
    this.fechaActual=moment(this.fecha).format('MMMM - YYYY');
    this.diasSemana= moment(this.fecha).format('dddd, DD');
    // this.cargainicial();
    this.cargaCitas();

  }

  // cargainicial(){
  //   moment.locale('es');
  //   this.UsuarioService.DisparadorVista.subscribe( (resp:any) =>{
  //     if(resp.data.vista == 'semana'){
  //       console.log("semana");
  //       this.semana = false;
  //       this.dia=true;
  //       this.dias=[];
  //       this.fechaActual =moment(resp.data.fecha).format('MMMM - YYYY');
  //       // this.HorarioSemana.push(moment(resp.data.fechaInicio).format('dddd, DD-MM-YYYY'))
  //       for(let index = 0; index < resp.data.dias; index++){
  //         console.log(resp.data.fechaInicio, index);
  //         let nueva_fecha = moment(resp.data.fechaInicio).add(index, 'days');

  //         console.log("nueva fecha", moment(nueva_fecha).format('DD-MM-YYYY'));
  //         this.dias.push(moment(nueva_fecha).format('dddd, DD'));
  //       }
  //       console.log("dias", this.dias);
  //     }
  //     if(resp.data.vista == 'dia'){
  //       this.fechaActual =moment(resp.data.fecha).format('MMMM - YYYY');
  //       console.log("dia");
  //       this.semana = true;
  //       this.dia=false;
  //       this.diasSemana = moment(resp.data.fecha).format('dddd, DD');

  //     }

  //   });
  // }

  cargaCitas(){
    moment.locale('es');
    this.UsuarioService.DisparadorCitas.subscribe( (resp:any)=>{
      this.citasRecibidas = resp.data.citas;
      // console.log("vista", resp.data.vista);
      if(resp.data.vista.vista == 'semana'){
        this.semana = false;
        this.dia=true;
        this.dias=[];
        let diasTemp=[]; 
        this.fechaActual =moment(resp.data.vista.fecha).format('MMMM - YYYY');
        // this.HorarioSemana.push(moment(resp.data.fechaInicio).format('dddd, DD-MM-YYYY'))
        for(let index = 0; index < resp.data.vista.dias; index++){
          console.log(resp.data.fechaInicio, index);
          let nueva_fecha = moment(resp.data.vista.fechaInicio).add(index, 'days');
          diasTemp.push(moment(nueva_fecha).format('YYYY-MM-DD'))
          this.dias.push(moment(nueva_fecha).format('dddd, DD'));
        }
        this.cargaCitasDefinitivas(diasTemp,  this.citasRecibidas  );
      }
      if(resp.data.vista.vista =='dia'){
        this.fechaActual =moment(resp.data.vista.fecha).format('MMMM - YYYY');
        console.log("dia");
        this.semana = true;
        this.dia=false;
        let diasTemp=[];
        diasTemp.push(moment(resp.data.vista.fecha).format('YYYY-MM-DD')); 
        this.diasSemana = moment(resp.data.vista.fecha).format('dddd, DD');
        this.cargaCitasDefinitivas(diasTemp, this.citasRecibidas );
      }

    })

  }

  cargaCitasDefinitivas(diasTemp, citas){
    this.citasDisponibles=[];
  for(let index = 0; index < this.horas.length; index++){
  this.citasDisponibles.push({ hora:this.horas[index], dias:[] } );
    for(let dia of diasTemp)
  {
     this.citasDisponibles[index]['dias'].push(citas.filter(h =>moment(h.start).format('DD-MM-YYYY') == moment(dia).format('DD-MM-YYYY')  && h.agen_hora == this.horas[index] ) );
  } 
  }
  }

  asignarCita(cita) {
console.log("Cita",cita );
this.spinner.show();
if(cita.id){
this.UsuarioService.reservaCitaTemp(Number(cita.id), 'reserva').subscribe((resp:any)=>{
    this.citaReservada = resp.data[0];
    this.spinner.hide();
    if(this.citaReservada.agen_idagenda){
      Swal.fire({
          title:"¿Confirmar cita?",
          text: 'PARA EL DÍA: '+ this.citaReservada.fecha+' A LAS : '+ this.citaReservada.agen_hora+'HRS CON EL  PROFESIONAL DR.:'+this.citaReservada.nombre_profesional+' PARA LA ESPECIALIDAD DE : '+this.citaReservada.especialidad, 
          showCancelButton: true,
          confirmButtonText: "Sí, Confirmar",
          cancelButtonText: "Cancelar",
      })
      .then(resultado => {
          if (resultado.value) {
            this.UsuarioService.DisparadorCitasReservada.emit({ data:this.citaReservada });

          } else {
            this.UsuarioService.reservaCitaTemp(Number(cita.id), 'anula').subscribe((resp:any)=>{
              this.citaReservada = resp.data[0];
            });
            }
      });
    }
});
}
if(!cita.id){
Swal.fire({
  // title: 'Error!',
  text: 'Cita Asignada recientemente',
  icon: 'warning',
  confirmButtonText: 'Cerrar'
});
}



  }


















//   actualizarListaCitas( data){
//     console.log("data",data.length);
//     let fecha1=null;
//     let fecha2=null;
//     let horasEncontradas=[];
//     for(let index = 0; index < data.length; index++){
//       fecha1 =  moment(this.fecha).format('YYYY-MM-DD');
//       fecha2 =  moment(data[index].start).format('YYYY-MM-DD');
//     if(fecha1 == fecha2){
//       console.log("hora", data[index].agen_hora); 
//       horasEncontradas.push(data[index])
//       console.log("this.horas.length", this.horas.length);
//     }
//     }
//     console.log("hoars encontardas", horasEncontradas);
//    //for dias
//     //recorrrer this.horas
//      //if(index) == horasEncontradas[index]; 
//      //si encuentra = hay hora disponible
//      //no encuentra = no hay hora disponible
//      //arreglo.push({})
//    for(let index1 = 0; index1 < this.horas.length; index1++){
//     console.log("horas::::",this.horas[index1]);

//   }
// }








// cargaCitasDefinitivas(diasTemp, citas){
//   console.log("Citas", citas);
//   console.log("horas", this.horas);
//   console.log("diasTemp", diasTemp);
//   let resultado=[];
//   for(let index = 0; index < diasTemp.length; index++){
//     //console.log("dias tempo", diasTemp[index]);
//     let dia = { fecha: diasTemp[index],
//                 horas : [] 
//               };

//     for(let index1 = 0; index1 < this.horas.length; index1++){
//       let citasDia = citas.filter(a => moment(a.agen_dia).format('YYYY-MM-DD') == moment(diasTemp[index]).format('YYYY-MM-DD'));
//       let citaF = citasDia.filter(a => a.agen_hora == this.horas[index1]);
//       dia.horas.push({
//           hora : this.horas[index1],
//           citas : citaF 
//       });
                

//     }
//     resultado.push(dia);
//   }

//   const resultadoAll =   resultado


//   for(let hora  of resultado){
//     hora.horas =  hora.horas.filter(h=>h.hora=="08:00")
//   }
//   console.log("result:::", resultado);
//    this.citasDisponibles = resultado;
//   console.log("citas ", this.citasDisponibles);

// }







}
