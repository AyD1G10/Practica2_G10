import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { FormsModule } from '@angular/forms';
import {  HttpClientModule  } from '@angular/common/http';
import { ConsultaVehiculoComponent } from './consulta-vehiculo/consulta-vehiculo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConsultaVehiculoComponent
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
