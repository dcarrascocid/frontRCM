import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasCentrosMedicosComponent } from './citas-centros-medicos.component';

describe('CitasCentrosMedicosComponent', () => {
  let component: CitasCentrosMedicosComponent;
  let fixture: ComponentFixture<CitasCentrosMedicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasCentrosMedicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasCentrosMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
