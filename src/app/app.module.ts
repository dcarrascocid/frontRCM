import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



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
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule 
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
