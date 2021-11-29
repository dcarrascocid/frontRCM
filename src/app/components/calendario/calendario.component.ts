import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import  { CalendarComponent }  from '@fullcalendar/core/CalendarComponent';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin ,  { Draggable } from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { UsuarioService } from '../../services/usuario.service';



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
  constructor( public UsuarioService :UsuarioService) { }

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

      eventClick: function(info) {
        // alert('Event: ' + info.event.id);
        this.citaReservada=info.event.id;
        console.log("cita ID", this.citaReservada);
        // change the border color just for fun
        info.el.style.borderColor = 'red';
      }
     
    }

    this.updateEvents();
  }

  updateEvents() {
    this.UsuarioService.DisparadorCitas.subscribe( data =>{
      console.log("recibiendo data de citas......", data);
      this.events =data.data;
    });
  }

  eventClick(model) {
    console.log(model);
  }
  eventDragStop(model) {
    console.log(model);
  }
  dateClick(model) {
    console.log(model);
    alert('clic');
  }

  updateHeader() {
    this.options.header = {
      left: 'prev,next myCustomButton',
      center: 'title',
      right: '',
    };
  }
  updateEventos() {
    this.events = [
      {
        title: 'Updaten Event',
        start: this.yearMonth + '-08',
        end: this.yearMonth + '-10',
      },
    ];
  }
  get yearMonth(): string {
    const dateObj = new Date();
    return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
  }
  dayRender(ev) {
    ev.el.addEventListener('dblclick', () => {
      alert('double click!');
    });
  }

  // seleccionaCita(cita){
  //   console.log("tester::::", cita);
  // }


  
}
