import { Injectable } from '@angular/core';
import { Tarea } from '../models/tarea.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasCrudService {

  private tareas: Tarea[] = [
    { id: 1, titulo: 'Tarea 1', descripcion: 'Descripción de la tarea 1', completada: false},
    { id: 2, titulo: 'Tarea 2', descripcion: 'Descripción de la tarea 2', completada: false},
  ];

  private readonly tareasSubject = new BehaviorSubject<Tarea[]>(this.tareas);
  tareas$ = this.tareasSubject.asObservable();
  private siguienteId: number = 3;

  constructor() {}

  obtenerTareas(): Tarea[] {
    return [...this.tareas];
  }

  agregarTarea(tarea: Tarea): void {
    tarea.id = this.siguienteId++;
    this.tareas.push(tarea);
    this.actualizarTareasObservable(); 
  }

  actualizarTarea(tarea: Tarea): void {
    const index = this.tareas.findIndex(t => t.id === tarea.id);
    if (index !== -1) {
      this.tareas[index] = tarea ;
      this.actualizarTareasObservable();
    }
  }

  eliminarTarea(id: number): void {
    this.tareas = this.tareas.filter(t => t.id !== id);
    this.actualizarTareasObservable();
  }

  private actualizarTareasObservable(): void {
    // Actualiza el BehaviorSubject para que los cambios sean reflejados en el observable
    this.tareasSubject.next([...this.tareas]);  // Mandamos una copia de las tareas actualizadas
  }
}
