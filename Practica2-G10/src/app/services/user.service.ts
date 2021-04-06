import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 

  }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  Login(email:string, password:string) {
    const url = "http://localhost:3000/login";

    return this.http.post(url,
      {
        "USUARIO_CORREO":email,
        "USUARIO_CONTRASENA":password
      }
      , { headers: this.headers })
      .pipe(map(data => data));
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


