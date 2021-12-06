import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CitasComponent } from './citas/citas.component';
import { ConfirmacionCitaComponent } from './confirmacion-cita/confirmacion-cita.component';
import { TablaResultadosComponent } from './tabla-resultados/tabla-resultados.component';
<<<<<<< HEAD
import { FichaClinicaComponent } from './ficha-clinica/ficha-clinica.component';
import { CitasCentrosMedicosComponent } from './citas-centros-medicos/citas-centros-medicos.component';
import { LoginComponent } from './login/login.component';
=======
import { CalendarioComponent } from './calendario/calendario.component';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModal, ModalDismissReasons, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";
>>>>>>> dcarrasco


@NgModule({
  declarations: [
    CitasComponent,
    ConfirmacionCitaComponent,
    TablaResultadosComponent,
<<<<<<< HEAD
    FichaClinicaComponent,
    CitasCentrosMedicosComponent,
    LoginComponent

=======
    CalendarioComponent
    
>>>>>>> dcarrasco

  ],

  exports:[
    CitasComponent,
    ConfirmacionCitaComponent,
    TablaResultadosComponent,
<<<<<<< HEAD
    FichaClinicaComponent,
    CitasCentrosMedicosComponent,
    LoginComponent


=======
    CalendarioComponent,
    
>>>>>>> dcarrasco
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
