import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaVehiculoComponent } from './consulta-vehiculo.component';
import { UserService } from 'src/app/services/user.service';
import {  of } from 'rxjs';

class UserServiceMock {
  Login = jasmine.createSpy('userService.Login');
  get = jasmine.createSpy('httpClient.get');
  post = jasmine.createSpy('httpClient.post');
  
}

describe('ConsultaVehiculoComponent', () => {
  let component: ConsultaVehiculoComponent;
  let fixture: ComponentFixture<ConsultaVehiculoComponent>;
  let userServiceMock; UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ConsultaVehiculoComponent,
        {
          provide: UserService,
           useValue: {
            consultarVehiculo: () => of(
              {data:[
                {
                  placa:"p355bgw",
                  id_user:"2",
                  Estado:"0",
                  descripcion:"en espera de piezas para cambio de filtros",
                  fecha_servicio:"15/03/2021",
                  fecha_salida:""
                }
              ]})
          },
        }
      ]
    })
    .compileComponents();
   
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create consultar vehiculo', () => {
    expect(component).toBeTruthy();
  });

  //prueba unitaria metodo de consulta de vehiculo
  it('retorna true si puede realizar la consulta', async() => {
     
    component.no_placa='p355bgw';
   
    //console.log(component.login());
    expect(component.consulta()).toEqual(true);
  });
});
