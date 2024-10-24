import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTareaComponent } from './form-tarea.component';
import { By } from '@angular/platform-browser';

describe('FormTareaComponent', () => {
  let component: FormTareaComponent;
  let fixture: ComponentFixture<FormTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe validar que los campos de título y descripción de la tarea son obligatorios', () => {
    // Caso 1: titulo vacio
    component.nuevaTarea.titulo = '';
    component.nuevaTarea.descripcion = 'Descripción tarea 1';
    
    component.agregarActualizarTarea();
    fixture.detectChanges(); 
    
    let mensajeError = fixture.debugElement.query(By.css('div.error'));
    expect(mensajeError).toBeTruthy(); 
    expect(mensajeError.nativeElement.textContent).toBe('Los campos de titulo y descripción de la tarea son obligatorios.');

    // Caso 2: descripcion vacia
    component.nuevaTarea.titulo = 'Tarea 1';
    component.nuevaTarea.descripcion = '';
    
    component.agregarActualizarTarea();
    fixture.detectChanges(); 
    
    mensajeError = fixture.debugElement.query(By.css('div.error'));
    expect(mensajeError).toBeTruthy();
    expect(mensajeError.nativeElement.textContent).toBe('Los campos de titulo y descripción de la tarea son obligatorios.');
  });

  it('No debería mostrar el mensaje de error cuando los campos son válidos', () => {
    component.nuevaTarea.titulo = 'Título válido';
    component.nuevaTarea.descripcion = 'Descripción válida';
    
    component.agregarActualizarTarea();
    fixture.detectChanges();
    
    const mensajeError = fixture.debugElement.query(By.css('div.error'));
    expect(mensajeError).toBeNull();
  });

  it('Debería actualizar la tarea cuando cambien las entradas', () => {
    const nuevaTarea = { id: 1, titulo: 'Tarea 1', descripcion: 'Descripción 1', completada: false };
    
    component.tarea = nuevaTarea;
    component.ngOnChanges();
    fixture.detectChanges();
    
    expect(component.nuevaTarea.titulo).toBe('Tarea 1');
    expect(component.nuevaTarea.descripcion).toBe('Descripción 1');
  });

  it('Debería resetear el formulario correctamente', () => {
    component.nuevaTarea.titulo = 'Tarea temporal';
    component.nuevaTarea.descripcion = 'Descripción temporal';
    
    component.resetearFormulario();
    fixture.detectChanges();
    
    expect(component.nuevaTarea.titulo).toBe('');
    expect(component.nuevaTarea.descripcion).toBe('');
    expect(component.nuevaTarea.completada).toBe(false);
  });

});
