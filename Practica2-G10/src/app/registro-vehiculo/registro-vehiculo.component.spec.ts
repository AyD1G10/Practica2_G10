import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../services/user.service';

import { RegistroVehiculoComponent } from './registro-vehiculo.component';
import {  of } from 'rxjs';
class UserServiceMock {
  RegistrarVehiculo = jasmine.createSpy('userService.RegistrarVehiculo');
  get = jasmine.createSpy('httpClient.get');
  post = jasmine.createSpy('httpClient.post');
  
}

describe('RegistroVehiculoComponent', () => {
  let component: RegistroVehiculoComponent;
  let fixture: ComponentFixture<RegistroVehiculoComponent>;
  let userServiceMock: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        RegistroVehiculoComponent,
        {
          provide: UserService,
           useValue: {
            RegistrarVehiculo: () => of({msg:true})
          },
        }
      ]
    })
    .compileComponents();
   
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroVehiculoComponent);
    component = fixture.componentInstance;
    
    userServiceMock = TestBed.get(UserService);
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should deny access with empty placa', () => {
     
    component.idusuario='01';
    component.placa = '';
    component.modelo = '2007';
    component.marca = 'toyota';
    component.linea = 'corrola';
   
    console.log(component.registrarVehiculo());
    expect(component.registrarVehiculo()).toEqual('Se produjo un error, favor de verificar datos.');
  });

  it('msg of server equals true', () => {

    component.idusuario='01';
    component.placa = 'PDEG232';
    component.modelo = '2011';
    component.marca = 'toyota';
    component.linea = 'corrola';
    
   
    expect(component.registrarVehiculo()).toEqual('Vehiculo agregado exitosamente.');
  });
});
