import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioTecnicoPage } from './formulario-tecnico.page';

describe('FormularioTecnicoPage', () => {
  let component: FormularioTecnicoPage;
  let fixture: ComponentFixture<FormularioTecnicoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioTecnicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
