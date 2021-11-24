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
  @Input() public calendario:any;
  constructor( public UsuarioService :UsuarioService) { }

  ngOnInit() {
    this.options={
      businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        daysOfWeek: [ 1, 2, 3, 4 ], // Monday - Thursday
      
        startTime: '10:00', // a start time (10am in this example)
        endTime: '18:00', // an end time (6pm in this example)
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
      resources: [
        {
          id: 'a',
          title: 'Resource A',
          businessHours: {
            startTime: '10:00',
            endTime: '18:00'
          }
        },
        {
          id: 'b',
          title: 'Resource B',
          businessHours: {
            startTime: '11:00',
            endTime: '17:00',
            daysOfWeek: [ 1, 3, 5 ] // Mon,Wed,Fri
          }
        }
      ]
     
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
  
}
