import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from 'src/app/services/user.service';
import { RegistroadminComponent } from './registroadmin.component';
import {  of } from 'rxjs';

describe('RegistroadminComponent', () => {
  let component: RegistroadminComponent;
  let fixture: ComponentFixture<RegistroadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        RegistroadminComponent,
        {
          provide: UserService,
           useValue: {
            guardarUsuario: () => of(
            {"user":"example@example","password":"1234","tipo":1,"id":1}
            )
          },
        }
      ]
    })
    .compileComponents();
   
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('Registra el usuario en admin', () => {
    component.email='example@example.com';
    component.password = '123';
    component.usertype = '1;'
    expect(component.Registrar()).toEqual(true);
  });

});
