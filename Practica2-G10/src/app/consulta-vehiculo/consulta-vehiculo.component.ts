import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-consulta-vehiculo',
  templateUrl: './consulta-vehiculo.component.html',
  styleUrls: ['./consulta-vehiculo.component.css']
})
export class ConsultaVehiculoComponent implements OnInit {
  public no_placa: string =""
  
  constructor(public services: UserService) { }

  elements : Object[];
  elements_table: Object[] =[];

  header =["Placa","id usuairo","Estado","Descripcion","fecha servicio", "fecha salida"];

  ngOnInit(): void {
  }

  consulta(){
    if(this.no_placa ===""){
      alert("debe ingresar una placa para consultar")
      return false;
    }else{
      this.services.consultarVehiculo(this.no_placa).subscribe((res)=>{
        alert("entro aqui")
        let response = JSON.stringify(res);
        let json_response = JSON.parse(response)
        //console.log(json_response.data)
        alert(json_response.data.length)
        if(json_response.data.length > 0){ //crear tabla
          this.elements = json_response.data;
          this.elements_table = this.elements.slice();
          return true;
        }else{ return false}
      });
    }
    return true;
  }
}
