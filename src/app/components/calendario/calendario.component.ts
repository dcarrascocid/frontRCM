import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import  { CalendarComponent }  from '@fullcalendar/core/CalendarComponent';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin ,  { Draggable } from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {
  @ViewChild('external') external: ElementRef;
  public events:any[];
  public options:any;
  public citaReservada:any=null;
  @Input() public calendario:any;
  constructor( 
    public UsuarioService :UsuarioService,
    private spinner: NgxSpinnerService,
    ) { }

  ngOnInit() {

    this.options={
      businessHours: {
        startTime: '08:00', // a start time (10am in this example)
        endTime: '19:00', // an end time (6pm in this example)
      },
      plugins:[dayGridPlugin,timeGridPlugin, interactionPlugin],
      defaulDate:new Date(),
      locale:esLocale,
      header:{
        left:'prev,next',
        center:'title',
        right:'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable:true,
      defaultView:'timeGridWeek',
      timeFormat: 'H(:mm)',

      eventClick:this.handleEventClick.bind(this),
      // eventClick: function(info) {
      //   // alert('Event: ' + info.event.id);
      //   this.citaReservada=info.event.id;
      //   console.log("cita ID", this.citaReservada);
 
      //   info.el.style.borderColor = 'red';

      // }
    }
    
    this.updateEvents();
  }

  get yearMonth(): string {
    const dateObj = new Date();
    return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
  }


  updateEvents() {
    this.UsuarioService.DisparadorCitas.subscribe( data =>{
      console.log("recibiendo data de citas......", data);
      this.events =data.data;
    });
  }

  eventClick(event) {
    console.log("TESTER:::::::::",event);
  }

  eventDragStop(model) {
    console.log(model);
  }

  handleEventClick(arg) {
      this.spinner.show();
    if(arg.event._def.publicId){
    this.UsuarioService.reservaCitaTemp(Number(arg.event._def.publicId), 'reserva').subscribe((resp:any)=>{
        this.citaReservada = resp.data[0];
        this.spinner.hide();
        if(this.citaReservada.agen_idagenda){
          Swal.fire({
              title: this.citaReservada.fecha+' '+ this.citaReservada.agen_hora+' Dr:'+this.citaReservada.nombre_profesional+'('+this.citaReservada.especialidad+')', 
              text: "¿Confirmar cita?",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: "Sí, Confirmar",
              cancelButtonText: "Cancelar",
          })
          .then(resultado => {
              if (resultado.value) {
                this.UsuarioService.DisparadorCitasReservada.emit({ data:this.citaReservada });

              } else {
                this.UsuarioService.reservaCitaTemp(Number(arg.event._def.publicId), 'anula').subscribe((resp:any)=>{
                  this.citaReservada = resp.data[0];
                });
                }
          });
        }
    });
  }
  if(!arg.event._def.publicId){
    Swal.fire({
      title: 'Error!',
      text: 'Cita Asignada recientemente',
      icon: 'error',
      confirmButtonText: 'Cerrar'
    });
  }

  }




  
}
