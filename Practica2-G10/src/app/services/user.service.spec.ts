import { TestBed } from '@angular/core/testing';
import {  of } from 'rxjs';

import {HttpClient} from '@angular/common/http';
import { UserService } from './user.service';

class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
  post = jasmine.createSpy('httpClient.post');
}

describe('UserService', () => {
  let service: UserService;
  let httpClientMock: HttpClientMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        {
          provide: HttpClient,
          useClass: HttpClientMock
        }
      ]
    });
    service = TestBed.get(UserService);
    httpClientMock = TestBed.get(HttpClient);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should returns an Observable with login status and set the user using http post response', () => {
    const userDataFromServer = {
      msg:true
    };
  
    httpClientMock.post.and.returnValue(of(userDataFromServer));
    
    const authData = {
      email: 'charlie@bird.jz',
      password: 'saxMadness1950'
    };
    service.Login(authData.email, authData.password).subscribe(result => {
      expect(result).toEqual(userDataFromServer);
    });
  });

  
  //
  it('debera devolver true si realiza la consulta y crea la tabla', () => {
    const userDataFromServer = {
      data:[
        {placa:"p355bgw",
        id_user:"2",
        Estado:"0",
        descripcion:"en espera de piezas para cambio de filtros",
        fecha_servicio:"15/03/2021",
        fecha_salida:""}
      ]};
  
    httpClientMock.post.and.returnValue(of(userDataFromServer));
    
    const services = {
      placa: 'p355bgw'
    };
    service.consultarVehiculo(services.placa).subscribe(result => {
      expect(result).toEqual(userDataFromServer);
    });
  });
});
