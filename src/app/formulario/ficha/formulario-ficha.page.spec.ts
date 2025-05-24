import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioFichaPage } from './formulario-ficha.page';

describe('FormularioFichaPage', () => {
  let component: FormularioFichaPage;
  let fixture: ComponentFixture<FormularioFichaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioFichaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
