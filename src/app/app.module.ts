import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
<<<<<<< HEAD
import {FormsModule} from '@angular/forms';
=======
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
>>>>>>> 99aacf782207ec5465cf80a9a8dd0c5913772d4b


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
    FormsModule
    
  ],
  providers: [
=======
    BrowserAnimationsModule
>>>>>>> 99aacf782207ec5465cf80a9a8dd0c5913772d4b
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
