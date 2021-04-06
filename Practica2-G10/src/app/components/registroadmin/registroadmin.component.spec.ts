import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroadminComponent } from './registroadmin.component';

describe('RegistroadminComponent', () => {
  let component: RegistroadminComponent;
  let fixture: ComponentFixture<RegistroadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroadminComponent ]
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
});
