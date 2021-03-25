import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string="";

  constructor() { }

  ngOnInit(): void {
  }

  login() {

    if (this.email===""||this.password===""){
      alert("Debe llenar todos los campos");
    }else{
      
    
      this.email="";
      this.password="";
    }
    
  }

  registrarse(){
   
  }
}
