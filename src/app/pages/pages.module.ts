import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { registerLocaleData } from '@angular/common';
// Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { PagesComponent } from './pages.component';


@NgModule({
  declarations: [
    PagesComponent
  ],
  exports: [
    PagesComponent,


  ],
  imports: [ 
    CommonModule,
    FormsModule,
    SharedModule,
    ComponentsModule,

  ]
})
export class PagesModule { }
