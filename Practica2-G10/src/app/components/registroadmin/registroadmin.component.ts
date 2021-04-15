import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-registroadmin',
  templateUrl: './registroadmin.component.html',
  styleUrls: ['./registroadmin.component.css']
})
export class RegistroadminComponent implements OnInit {
  public email:string ="";
  public password:string = "";
  public usertype:string = "";

  constructor(public services: UserService) { }

  ngOnInit(): void {
  }

  Registrar() {

    if(this.email != "" && this.password != "" && this.usertype != "") {
      const jsonFile = {
        "user":this.email,
        "password":this.password,
        "tipo":Number(this.usertype)
      }
      this.email = "";
      this.password = "";
      this.usertype = "";
      console.log(jsonFile)
      this.services.guardarUsuario(jsonFile)
      return true;
    } else {
      return "Rellenar todos los campos"
    }
  }

  guardarUsuario(jsonFile) {
    const url = "http://localhost:3000/registro"
    fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonFile),
    })
    .then(res => res)
  }
}
