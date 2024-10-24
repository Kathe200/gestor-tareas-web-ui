import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticacionComponent } from './autenticacion.component';
import { By } from '@angular/platform-browser';

describe('AutenticacionComponent', () => {
  let component: AutenticacionComponent;
  let fixture: ComponentFixture<AutenticacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AutenticacionComponent]}).compileComponents();
    fixture = TestBed.createComponent(AutenticacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debería validar que los campos de usuario y contraseña de la tarea son obligatorios', () => {
    // Caso 1: Usuario vacio
    component.usuario.nombreUsuario = '';
    component.usuario.contrasena = 'contrasenaSegura123!';
    
    component.login();
    fixture.detectChanges(); 
    
    let mensajeError = fixture.debugElement.query(By.css('div.error'));
    expect(mensajeError).toBeTruthy();
    expect(mensajeError.nativeElement.textContent).toBe('Los campos de usuario y contraseña son obligatorios.');
    
    // Caso 2: Contraseña vacia
    component.usuario.nombreUsuario = 'admin';
    component.usuario.contrasena = '';
    
    component.login();
    fixture.detectChanges(); 
    
    mensajeError = fixture.debugElement.query(By.css('div.error'));
    expect(mensajeError).toBeTruthy();
    expect(mensajeError.nativeElement.textContent).toBe('Los campos de usuario y contraseña son obligatorios.');
  });


  it('Debería validar que los campos de usuario y/o contraseña de la tarea esten correctos', () => {
    // Caso 1: Usuario incorrecto
    component.usuario.nombreUsuario = 'admi';
    component.usuario.contrasena = 'contrasenaSegura123!';
    
    component.login();
    fixture.detectChanges(); 
    
    let mensajeError = fixture.debugElement.query(By.css('div.error'));
    expect(mensajeError).toBeTruthy();
    expect(mensajeError.nativeElement.textContent).toBe('Usuario o contraseña incorrectos. Por favor intente de nuevo o reasigne.');
    
    // Caso 2: Contraseña incorrecta
    component.usuario.nombreUsuario = 'admin';
    component.usuario.contrasena = 'contrasena';
    
    component.login();
    fixture.detectChanges(); 
    
    mensajeError = fixture.debugElement.query(By.css('div.error'));
    expect(mensajeError).toBeTruthy();
    expect(mensajeError.nativeElement.textContent).toBe('Usuario o contraseña incorrectos. Por favor intente de nuevo o reasigne.');
  });

});
