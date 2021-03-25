import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from './login.component';
import {  of } from 'rxjs';

import {HttpClient} from '@angular/common/http';

class UserServiceMock {
  Login = jasmine.createSpy('userService.Login');
  get = jasmine.createSpy('httpClient.get');
  post = jasmine.createSpy('httpClient.post');
  
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceMock: UserService;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        LoginComponent,
        {
          provide: UserService,
           useValue: {
            Login: () => of({msg:true})
          },
        }
      ]
    })
    .compileComponents();
   
  });

 
   beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    
    userServiceMock = TestBed.get(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should deny access with empty password', () => {
     
    component.email='ejemplo1@gmail.com';
    component.password = '';
   
    console.log(component.login());
    expect(component.login()).toEqual('Llenar todos los campos');
  });

  it('should deny access with empty email', () => {
     
    component.email='';
    component.password = '123';
   
    console.log(component.login());
    expect(component.login()).toEqual('Llenar todos los campos');
  });

  it('should deny access with empty password and empyt email', () => {
     
    component.email='';
    component.password = '';
   
    console.log(component.login());
    expect(component.login()).toEqual('Llenar todos los campos');
  });


 

  it('msg of server equals true', () => {

    component.email='ejemplo@gmail.com';
    component.password = '123';
    
   
    expect(component.login()).toEqual('login_valid');
  });

  it('msg of server equals false', () => {
    component.email='ejemplo@gmail.com';
    component.password = '123';


  
    const mockedResponse = {msg:false}; // Modify as per your need
    spyOn(userServiceMock, 'Login').and.callFake(() => {
      return of(mockedResponse);
    });

   
    expect(component.login()).toEqual('login_invalid');
  });
});
