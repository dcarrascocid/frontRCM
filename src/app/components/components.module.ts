import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { CitasComponent } from './citas/citas.component';
import { ConfirmacionCitaComponent } from './confirmacion-cita/confirmacion-cita.component';





@NgModule({
  declarations: [
    CitasComponent,
    ConfirmacionCitaComponent


  ],
  exports: [
    CitasComponent,
    ConfirmacionCitaComponent



  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,

  ]
})
export class ComponentsModule { }
