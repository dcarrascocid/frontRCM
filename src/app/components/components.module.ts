import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CitasComponent } from './citas/citas.component';
import { ConfirmacionCitaComponent } from './confirmacion-cita/confirmacion-cita.component';
import { TablaResultadosComponent } from './tabla-resultados/tabla-resultados.component';


@NgModule({
  declarations: [
    CitasComponent,
    ConfirmacionCitaComponent,
    TablaResultadosComponent


  ],
  exports: [
    CitasComponent,
    ConfirmacionCitaComponent,
    TablaResultadosComponent



  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule, ReactiveFormsModule

  ]
})
export class ComponentsModule { }
