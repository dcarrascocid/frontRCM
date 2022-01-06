import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CitasComponent } from './citas/citas.component';
import { ConfirmacionCitaComponent } from './confirmacion-cita/confirmacion-cita.component';
import { TablaResultadosComponent } from './tabla-resultados/tabla-resultados.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModal, ModalDismissReasons, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";
import { ImagenComponent } from './imagen/imagen.component';
import { LaboratorioComponent } from './laboratorio/laboratorio.component';


@NgModule({
  declarations: [
    CitasComponent,
    ConfirmacionCitaComponent,
    TablaResultadosComponent,
    CalendarioComponent,
    ImagenComponent,
    LaboratorioComponent
    

  ],
  exports: [
    CitasComponent,
    ConfirmacionCitaComponent,
    TablaResultadosComponent,
    CalendarioComponent,
    ImagenComponent,
    LaboratorioComponent
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ]
})
export class ComponentsModule { }
