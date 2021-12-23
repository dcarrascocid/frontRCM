import { Injectable, NgZone, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';


import { environment } from '../../environments/environment';


const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  @Output() DisparadorCitas: EventEmitter<any> = new EventEmitter(); 
  @Output() DisparadorReserva: EventEmitter<any> = new EventEmitter(); 
  @Output() DisparadorCitasReservada: EventEmitter<any> = new EventEmitter(); 
  @Output() ReservaCitas: EventEmitter<any> = new EventEmitter(); 
  @Output() DisparaPrestacion : EventEmitter<any> = new EventEmitter(); 
  @Output() DisparadorVista : EventEmitter<any> = new EventEmitter(); 

  public auth2: any;

  constructor( private http: HttpClient, 
                private router: Router,
                private ngZone: NgZone ) {

    // this.googleInit();
  }


  // googleInit() {

  //   return new Promise( resolve => {
  //     gapi.load('auth2', () => {
  //       this.auth2 = gapi.auth2.init({
  //         client_id: '1045072534136-oqkjcjvo449uls0bttgvl3aejelh22f5.apps.googleusercontent.com',
  //         cookiepolicy: 'single_host_origin',
  //       });

  //       resolve();
  //     });
  //   })

  // }

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {

      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });

  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/usuarios/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token );
      }),
      map( resp => true),
      catchError( error => of(false) )
    );

  }

  loginGoogle( token ) {
    
    return this.http.post(`${ base_url }/login/google`, { token } )
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token )
                  })
                );

  }

  buscarPrestador(){
    
    return this.http.get(`${ base_url }/buscarprestador` )

  }

  BuscarAtributosPrestador(rut){
    const body ={
      rut:rut
    }
    return this.http.post(`${ base_url }/buscarprofesionalrut`, body )
  }

  cargarAgenda(data){
    return this.http.post(`${ base_url }/cargaragenda`, data);
  }

  getToken(){
    const data = null;
    return this.http.get(`${ base_url }/fon-obtener-token`);
  }

  buscarbeneficiario(data){
    return this.http.post(`${ base_url }/fon-buscar-beneficiario`, data);
  }

  buscaEspecialidades(){
      return this.http.get(`${ base_url }/especialidades`);
  }

  
  buscaEspecialidadesBySucursal(suc_id){
        return this.http.get(`${ base_url }/especialidadesbysucursal/${suc_id}`);
  }
  
  buscaEspecialidadesPrestador(pre_id){
    const data ={
      pre_id:pre_id
    }
    return this.http.post(`${ base_url }/especialidadesprestador`, data);
  }

  buscaSucursales(pre_id){
    const data={
      pre_id:pre_id
    }
    return this.http.post(`${ base_url }/sucursales`, data);
  }

  BuscaSucursalesByPrestador(){
    const pre_id= 1;
    return this.http.get(`${ base_url }/sucursales/${pre_id}`);
  }

  buscarRegionbySucursal(suc_id){
    return this.http.get(`${ base_url }/regionbysucursal/${suc_id}`);
  }

  BuscaRegionPrestador(pre_id){
    const data={
      pre_id:pre_id
    }
    return this.http.post(`${ base_url }/regionprestador`, data);
  }

  buscaComunaPrestador(reg_idregion){
    const data={
      reg_idregion:reg_idregion
    }
    return this.http.post(`${ base_url }/comunaprestador`, data);
  }

  buscaEspecilidadeComuna(com_idcomuna){
    const data={
      com_idcomuna:com_idcomuna
    }
    return this.http.post(`${ base_url }/especialidadcomuna`, data); 
  }
  
  buscaRegionXEspecialidad(esp_idespecialidad){
    const data={
      esp_idespecialidad:esp_idespecialidad
    }
    return this.http.post(`${ base_url }/regionespecialidad`, data); 
  }

  buscarProfespecialidad(esp_idespecialidad){
    const data={
      esp_idespecialidad:esp_idespecialidad
    }
    return this.http.post(`${ base_url }/profespecialidad`, data); 
  }
  
  buscaPrestacionAll(){
    return this.http.get(`${ base_url }/prestaciones`); 
  }  

  prestacionesbysucursal(suc_id){
    return this.http.get(`${ base_url }/prestacionesbysucursal/${suc_id}` ); 
  }

  buscaCitasDisponiblesProf(data){
    return this.http.post(`${ base_url }/buscacitasprofe`, data); 
  }  

  buscaCitasDisponiblesAll(data){
    return this.http.post(`${ base_url }/buscacitasall`, data); 
  }

  reservaCitaTemp(data, estado){
    const form ={
      cita_id:data,
      estado:estado
    };
    console.log("data", form);
    return this.http.post(`${ base_url }/reservatemporal`, form); 

  }

  prestacionesfonasa(){
    return this.http.get(`${ base_url }/prestacionesfonasa`); 
  }

  valorizarPrestacion(data, prestacion){
    const form ={
      rut: data.data.beneficiario.run,
      idencuentro: data.idencuentro,
      codigoprestacion: prestacion,
      rutprestadortratante : data.rut,
    };
    console.log("valoriza encuentro", form);
    return this.http.post(`${ base_url }/fon-valorizar-encuentro`, form); 
   }

   valorizaPrestaciones(data){
    return this.http.post(`${ base_url }/fon-valorizar-prestaciones`, data);     
   }


   confirmarBono(data){
        return this.http.post(`${ base_url }/fon-confirmar-pago`, data); 
   }

   confirmaPagoParticular(data){
    return this.http.post(`${ base_url }/confirmar-pago-particular`, data); 
}

   buscarCopiaBono(folio){
     const data ={
       folio:folio
     }
    return this.http.post(`${ base_url }/fon-obtener-copia-bono`, data);   
   }

   guardarPacienteParticuluar(data){
    return this.http.post(`${ base_url }/pacienteparticular`, data); 
   }

   prestacionByGrupo(data){
    return this.http.post(`${ base_url }/prestacionbygrupo`, data); 
   }
   


}

