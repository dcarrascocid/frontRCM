/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ImagenComponent } from './imagen.component';

describe('ImagenComponent', () => {
  let component: ImagenComponent;
  let fixture: ComponentFixture<ImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
