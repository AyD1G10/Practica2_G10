import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from  "./components/login/login.component";
import { ConsultaVehiculoComponent } from './consulta-vehiculo/consulta-vehiculo.component';

const routes: Routes = [
  {
  path: 'login',
  component:LoginComponent
 
  },
  {
    path: 'consultarVehiculo',
    component:ConsultaVehiculoComponent
   
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
