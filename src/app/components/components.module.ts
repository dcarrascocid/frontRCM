import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { CitasComponent } from './citas/citas.component';
import { ConfirmacionCitaComponent } from './confirmacion-cita/confirmacion-cita.component';
import { TablaResultadosComponent } from './tabla-resultados/tabla-resultados.component';
import { FichaClinicaComponent } from './ficha-clinica/ficha-clinica.component';
import { CitasCentrosMedicosComponent } from './citas-centros-medicos/citas-centros-medicos.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    CitasComponent,
    ConfirmacionCitaComponent,
    TablaResultadosComponent,
    FichaClinicaComponent,
    CitasCentrosMedicosComponent,
    LoginComponent


  ],

  exports:[
    CitasComponent,
    ConfirmacionCitaComponent,
    TablaResultadosComponent,
    FichaClinicaComponent,
    CitasCentrosMedicosComponent,
    LoginComponent


  ],
  
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,

  ]
})
export class ComponentsModule { }
