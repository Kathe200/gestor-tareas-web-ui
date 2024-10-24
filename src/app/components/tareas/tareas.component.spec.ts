import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasComponent } from './tareas.component';
import { Tarea } from '../../models/tarea.model';

describe('TareasComponent', () => {
  let component: TareasComponent;
  let fixture: ComponentFixture<TareasComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [TareasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debería abrir el formulario en modo edición con una tarea seleccionada', () => {
    const tarea: Tarea = { id: 1, titulo: 'Tarea 1', descripcion: 'Descripción', completada: false };
    component.abrirFormTareas(tarea);
    expect(component.botonNuevaTarea).toBe(true);
    expect(component.esEdicion).toBe(true);
    expect(component.tareaSeleccionada).toEqual(tarea);
  });

  it('Debería agregar una nueva tarea', () => {
    const tarea: Tarea = { id: 0, titulo: 'Nueva Tarea', descripcion: 'Descripción', completada: false };
    spyOn(component['tareaCrud'], 'agregarTarea');
    component.guardarTarea(tarea);
    expect(component['tareaCrud'].agregarTarea).toHaveBeenCalledWith(tarea);
  });

  it('Debería eliminar una tarea', () => {
    const tareaId = 1;
    spyOn(component['tareaCrud'], 'eliminarTarea');
    component.eliminarTarea(tareaId);
    expect(component['tareaCrud'].eliminarTarea).toHaveBeenCalledWith(tareaId);
  });

});
