import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from  "./components/login/login.component";
import { RegistroComponent } from "./components/registro/registro.component";
import { RegistroadminComponent } from "./components/registroadmin/registroadmin.component";

const routes: Routes = [
  {
  path: 'login',
  component:LoginComponent
 
  },
  {
    path:'registro',
    component:RegistroComponent
  },
  {
    path:'registroadmin',
    component:RegistroadminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
