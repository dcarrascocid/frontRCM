import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { UtilService } from '../../services/util.service';
import * as moment from 'moment';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {
  public token=null;
  public pres_id=null;
  public prestadores:any=null;
  public especialidades:any =null;
  public profesionales:any=null;
  public prestaciones:any=null;
  public prestacion:any=null;
  public regiones:any =null;
  public comunas:any =null;
  public sucursal:any =null;
  public profesional=null;
  public especialidad=null;
  public prestador=null;
  public citas:any=null;
  fecha =new Date;
  public fechaInicio = moment(this.fecha).format('YYYY-MM-DD');
  public ultimoDia  = new Date(this.fecha.getFullYear(), this.fecha.getMonth() + 1, 0);
  public fechaTermino=moment(this.ultimoDia).format('YYYY-MM-DD');
  
  fecha1 = new FormControl(this.fechaInicio, []); 
  fecha2 = new FormControl(this.fechaTermino, []); 
  public consultaForm: FormGroup;


  constructor(
    private formBuilder :FormBuilder,
    public UsuarioService :UsuarioService,
    public Utils: UtilService,
    
    ) { 
      this.consultaForm = this.formBuilder.group({
        rut:[''],
        tipoDoc:[1],
        id_encuentro:null  
      });


  }

  ngOnInit() {
    this.obetnerToken();
    this.buscaPrestador();
    // this.fechas();
    this.buscaPrestacion();
  }

  get revItemForm(){
    return this.consultaForm.controls;
  }

  fechas(){
    
    const date = new Date();
     const primerDia = date;

    //  const primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
     const ultimoDia  = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.fechaInicio = moment(primerDia).format('YYYY-MM-DD');
      this.fechaTermino = moment(ultimoDia).format('YYYY-MM-DD');

console.log("fecha1", this.fecha1.value);
    }



  obetnerToken(){
      this.UsuarioService.getToken().subscribe((data:any)=>{

        if(!data.data){
          Swal.fire({
            title: 'Error!',
            text: data.data,
            icon: 'error',
            confirmButtonText: 'Cerrar'
          })
        }
        this.token = data.data;

      })
  }

  buscarBeneficiario(){
    const data ={
      rut:this.consultaForm.value.rut
    };

    if(this.consultaForm.value.tipoDoc ==1){//es rut 
      this.UsuarioService.buscarbeneficiario(data).subscribe((resp:any)=>{
        console.log("erspuesta",resp);
          if(resp.ok){ // es fonasa
            this.consultaForm.value.id_encuentro=resp.data.id_encuentro;
            this.consultaForm.value.tipo='Fonasa'
          console.log("this.adada", this.consultaForm);          }
          if(!resp.ok){//no es fonasa
            Swal.fire({
              title: 'Error!',
              text: resp.data,
              icon: 'error',
              confirmButtonText: 'Cerrar'
            });
          }       

      });

    }
    if(this.consultaForm.value.tipoDoc == 2 ){ //direrente a rut

    }
    


  }
  
  buscaEspecialidades(){
    this.UsuarioService.buscaEspecialidades().subscribe((resp:any)=>{
      this.especialidades= resp.data;
      console.log("especilaidades",this.especialidades);

    });
  }

  buscaSucursales(pre_id){
  
    // this.UsuarioService.buscaEspecialidades(pre_id).subscribe((resp:any)=>{
    //   this.especialidades= resp.data;
    //   console.log("especilaidades",this.especialidades);

    // });
  }


  buscaPrestador(){
  
    this.UsuarioService.BuscaPrestador().subscribe((resp:any)=>{
      // console.log("Res  Espe",resp);
      this.prestadores = resp.data;

    });
  }

  validarRut()
  {
    if(!this.Utils.validateRun( this.consultaForm.value.rut)) 
    {
      this.consultaForm.controls.rut.setErrors({'invalido': true});
    }
  }

  cambiaPrestador(pre_id){
    if(pre_id){
      this.prestador=pre_id;
      this.BuscaRegionPrestador(pre_id);
      this.UsuarioService.buscaEspecialidadesPrestador(pre_id).subscribe((resp:any)=>{
     
          this.especialidades=resp.data;
        });
 

    }
  }

 cambiaRegion(reg_idregion){
  if(reg_idregion){
    this.buscaComunaPrestador(reg_idregion);
  }

 }

 cambiaComuna(com_idcomuna){
   if(!this.especialidades){
     this.buscaEspecialidadporComuna(com_idcomuna);
   }

 }


cambiaEspecialidad(esp_idespecialidad){
  this.especialidad=esp_idespecialidad;
    this.buscaRegionXEspecialidad(esp_idespecialidad);
    this.buscarProfespecialidad(esp_idespecialidad);
  }

cambiaProfesional(pro_idprofesional){
  this.profesional=pro_idprofesional
    this.BuscaCitasDisponibles(pro_idprofesional);
}

BuscaRegionPrestador(pre_id){
  
    this.UsuarioService.BuscaRegionPrestador(pre_id).subscribe((resp:any)=>{
      this.regiones= resp.data;

    });
}


buscaComunaPrestador(reg_idregion){
    this.UsuarioService.buscaComunaPrestador(reg_idregion).subscribe((resp:any)=>{
      this.comunas= resp.data;

    });

}

buscaEspecialidadporComuna(com_idcomuna){
  this.UsuarioService.buscaEspecilidadeComuna(com_idcomuna).subscribe((resp:any)=>{
    this.especialidades= resp.data;

  });
}

buscaRegionXEspecialidad(esp_idespecialidad){
  this.UsuarioService.buscaRegionXEspecialidad(esp_idespecialidad).subscribe((resp:any)=>{
    this.regiones= resp.data;


  });
}

buscarProfespecialidad(esp_idespecialidad){
  this.UsuarioService.buscarProfespecialidad(esp_idespecialidad).subscribe((resp:any)=>{
    
    if(resp.data.length ==0){
      Swal.fire({
        title: 'Error!',
        text: resp.mensaje,
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    }
      this.profesionales= resp.data;

  });
}

BuscaCitasDisponibles(pro_idprofesional){

}


buscaPrestacion(){
  
  this.UsuarioService.buscaPrestacionAll().subscribe((resp:any)=>{
    this.prestaciones= resp.data;


  });
}

cambiaPrestacion(pres_id){
if(pres_id){
  this.prestacion=pres_id
}

}

buscarCita(){
 
  const data={
    pre_id:this.prestador,
    esp_id:this.especialidad,
    fecha_inicio:this.fecha1.value,
    fecha_termino:this.fecha2.value,
    profesionales:this.profesionales,
    pres_idprestacion:this.prestacion,
  }; 

  if(this.profesional){
console.log("entro en con pro");
    this.UsuarioService.buscaCitasDisponiblesProf(data).subscribe((resp:any)=>{
  if(resp.data.length ==0){
    Swal.fire({
      title: 'Error!',
      text: resp.mensaje,
      icon: 'error',
      confirmButtonText: 'Cerrar'
    });
  }
  this.citas=resp.data

          });
  }
  if(!this.profesional && this.profesionales){

    this.UsuarioService.buscaCitasDisponiblesAll(data).subscribe((resp:any)=>{
      if(resp.data.length ==0){
        Swal.fire({
          title: 'Error!',
          text: resp.mensaje,
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
      this.citas=resp.data
      this.UsuarioService.DisparadorCitas.emit({
        data:this.citas
      })
      console.log("citas", this.citas);

              });
          

  }
  
}

cambiaFecha(datos){
  console.log("datos", datos.value);
  console.log("datos", JSON.parse(JSON.stringify(datos.name)));
}

cambiaVer(data){
  if(data==2){

    this.fecha.setDate(this.fecha.getDate() - this.fecha.getDay());
    const first = new Date(this.fecha);
    const  last = new Date(this.fecha);
    last.setDate(last.getDate()+6);

    console.log("fecha1 ",first);
    console.log("fecha1 ",last);

}
if(data ==1){
  console.log("ver semana");
}
}
}

