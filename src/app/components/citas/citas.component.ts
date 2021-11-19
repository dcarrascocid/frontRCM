import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'
import { FormControl, FormGroup, Validators, FormGroupDirective, FormBuilder } from '@angular/forms'
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
  public fechasParams:any;
  



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
    this.buscaEspecialidades();
    this.fechas();
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
      const fechaInicio = moment(primerDia).format('YYYY-MM-DD');
      const fechaTermino = moment(ultimoDia).format('YYYY-MM-DD');
      this.fechasParams =[{
        nombre:'Desde',
        fecha:fechaInicio,
      },{
        nombre:'Hasta',
        fecha:fechaTermino,
      }]

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
  console.log("tester");
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
      this.BuscaRegionPrestador(pre_id);
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
  console.log(":::::::::LISTADO PARA LA BUSQUEDA:::::::");
    console.log("PROF:::", this.profesionales);
    console.log("PRESTA::", this.prestacion);
    console.log("ESPECIALIDAD::", this.especialidad);


  
}

}

