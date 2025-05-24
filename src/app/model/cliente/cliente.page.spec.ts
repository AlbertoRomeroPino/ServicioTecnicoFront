import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientePage } from './cliente.page';

describe('ClientePagePage', () => {
  let component: ClientePage;
  let fixture: ComponentFixture<ClientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
