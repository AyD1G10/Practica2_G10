import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { FormsModule } from '@angular/forms';
import {  HttpClientModule  } from '@angular/common/http';
import { RegistroVehiculoComponent } from './registro-vehiculo/registro-vehiculo.component';
import { ConsultaVehiculoComponent } from './consulta-vehiculo/consulta-vehiculo.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RegistroadminComponent } from './components/registroadmin/registroadmin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConsultaVehiculoComponent,
    RegistroVehiculoComponent
    RegistroComponent,
    RegistroadminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
