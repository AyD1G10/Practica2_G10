import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponent } from './registro.component';
import { UserService } from 'src/app/services/user.service';
import {  of } from 'rxjs';

class UserServiceMock {
  Login = jasmine.createSpy('userService.Login');
  get = jasmine.createSpy('httpClient.get');
  post = jasmine.createSpy('httpClient.post');
  
}



describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let userServiceMock; UserService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        RegistroComponent,
        {
          provide: UserService,
           useValue: {
            guardarUsuario: () => of(
            {"user":"example@example","password":"1234","tipo":0,"id":1}
            )
          },
        }
      ]
    })
    .compileComponents();
   
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Registra el usuario', () => {
    component.email='example@example.com';
    component.password = '123';
    
    expect(component.Registrar()).toEqual(true);
  });

});
