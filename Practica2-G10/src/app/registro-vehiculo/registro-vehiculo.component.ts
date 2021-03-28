import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-registro-vehiculo',
  templateUrl: './registro-vehiculo.component.html',
  styleUrls: ['./registro-vehiculo.component.css']
})
export class RegistroVehiculoComponent implements OnInit {

  public idusuario : string = "";
  public placa: string = "";
  public modelo: string="";
  public marca: string="";
  public linea: string="";

  elements: Object[] = [ ];

  constructor(public service : UserService) { }

  ngOnInit(): void {
  }


  registrarVehiculo(){
    
    if(this.idusuario != "" && this.placa != "" && this.linea != "" && this.marca != "" && this.modelo != ""){
      this.service.registrarVehiculo(this.idusuario,this.placa, this.modelo, this.marca, this.linea)
      .subscribe((res)=>{
        console.log(res);
        if (res['msg'] == true) {
          alert('Vehiculo agregado exitosamente.')
        }else if(res['msg'] == "placa"){
          alert('El No. de placa ya se encuentra registrado.')
        }else{
          alert('Se produjo un error, favor de verificar datos. ')
        }
        this.idusuario = "";
        this.placa = "";
        this.linea = "";
        this.marca = "";
        this.modelo = "";

      })

    }else{
      alert('Se produjo un error, favor de verificar datos. ')
    }

  }
}
