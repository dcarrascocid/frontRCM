import { Injectable } from '@angular/core';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class UtilService {

constructor() { }

revisaTipo(tipo:string){
  const tipo_ = String(tipo).toUpperCase();
  
  return (tipo_ == 'DISPO' || tipo_ == 'CITADO') ? '' : 'estado_no_valido';
}
revisaFecha(fecha:string) {
  
  if ( /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/.test(this.getFechaText(fecha)) ) {
    return ''
  } else {
    return 'fecha_no_valida';
  }

}
getFechaFormat(fecha:string){

  let fecha_;
  if( String(fecha).includes("-") ){
    fecha_ =fecha;
  }else{
    let utc_value = Math.floor(Number(fecha)- 25569) * 86400;
    let date_info = new Date(utc_value * 1000);
    fecha_ = moment(date_info).format('YYYY-MM-DD');
  }
  return fecha_;
}
revisaHora(hora:string) {
    
  if ( /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/.test(this.getHoraText(hora)) ) {
    return ''
  } else {
    return ' hora_no_valida';
  }

}
getHoraFormat(fecha:string){

  let fecha_;
  if( String(fecha).includes("-") ){
    fecha_ =fecha;
  }else{
    let utc_value = Math.floor(Number(fecha)- 25569) * 86400;
    let date_info = new Date(utc_value * 1000);
    fecha_ = moment(date_info).format('HH:mm');
  }
  console.log("Hora", fecha_);
  return fecha_;
}
revisaEntero(numero){
  
  if (/^[0-9]{1,3}?(.)?[0-9]{1,3}$/.test(numero) ) {
    return '';
  } else {
    return 'intervalo_no_valido';
  }
}

getFechaText(fecha:string){

  let fecha_;
  if( String(fecha).includes("-") ){
    fecha_ =fecha;
  }else{
    fecha_ = moment(fecha).format('YYYY-MM-DD');
  }
  return fecha_;
}

getHoraText(hora:string){
  let hora_
  if( String(hora).includes(":") ){
    hora_ =hora;
  }else{
    hora_ = moment(hora).format('HH:mm');
  }
  return hora_;
}

}
