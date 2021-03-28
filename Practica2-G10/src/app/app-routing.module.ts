import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from  "./components/login/login.component";
import { RegistroVehiculoComponent } from './registro-vehiculo/registro-vehiculo.component'

const routes: Routes = [
  {
  path: 'login',
  component:LoginComponent
 
  },
  {
    path: 'registroVehiculo',
    component: RegistroVehiculoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
