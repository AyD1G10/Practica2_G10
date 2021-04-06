import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/services/user.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public email:string = "";
  public password:string = "";

  constructor(public services: UserService) { }

  ngOnInit(): void {
  }

  Registrar() {
    if(this.comprobacionCampos(this.email,this.password)) {

      const jsonFile = {
        "user":this.email,
        "password":this.password,
        "tipo":0
      }
      this.email = "";
      this.password = "";
      console.log(jsonFile)
      this.services.guardarUsuario(jsonFile)
      return true;
    } else {
      return "Rellenar todos los campos"
    }
  }

  comprobacionCampos(user,pass) {
    if(user !== "" && pass !== "") {
      return true;
    }
    return false;
  }

}
