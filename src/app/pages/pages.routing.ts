import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { CitasComponent } from '../components/citas/citas.component';
import { ConfirmacionCitaComponent } from '../components/confirmacion-cita/confirmacion-cita.component'



const routes: Routes = [
    { 
        path: 'reservas', 
        component: PagesComponent,
        children: [
            { path: 'citas', component: CitasComponent, data: { titulo: 'citas' } },   
            { path: 'confirmacion', component: ConfirmacionCitaComponent, data: { titulo: 'Confirmacion' } },   

        ]
   

    },
    { 
    path: 'confirmacion', component: ConfirmacionCitaComponent, data: { titulo: 'Confirmacion' } 
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


