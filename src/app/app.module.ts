import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
<<<<<<< HEAD
<<<<<<< HEAD
import {FormsModule} from '@angular/forms';
=======
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
>>>>>>> 99aacf782207ec5465cf80a9a8dd0c5913772d4b
=======
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { NgbModal, ModalDismissReasons, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { CitasComponent } from './components/citas/citas.component';
import { ConfirmacionCitaComponent } from './components/confirmacion-cita/confirmacion-cita.component';

>>>>>>> dcarrasco


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PagesModule,
    ComponentsModule,
<<<<<<< HEAD
<<<<<<< HEAD
    FormsModule
    
=======
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
>>>>>>> dcarrasco
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
=======
    BrowserAnimationsModule
>>>>>>> 99aacf782207ec5465cf80a9a8dd0c5913772d4b
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
