import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { CitasComponent } from './citas/citas.component';




@NgModule({
  declarations: [
    CitasComponent


  ],
  exports: [
    CitasComponent



  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,

  ]
})
export class ComponentsModule { }
