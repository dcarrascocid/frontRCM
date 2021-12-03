import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Modulos
import { PagesRoutingModule } from './pages/pages.routing';



const routes: Routes = [

  // path: '/dashboard' PagesRouting
  // path: '/auth' AuthRouting
  // path: '/medicos' MedicosRouting
  // path: '/compras' ComprasRouting
  { path: '', redirectTo: '/reservas', pathMatch: 'full' },
  { path: 'confirmacion', redirectTo: '/confirmacion', pathMatch: 'full' },

];



@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule,

  ],
  exports: [ RouterModule ],
   declarations: [

  ]
})
export class AppRoutingModule { }
