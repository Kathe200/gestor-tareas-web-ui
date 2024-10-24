import { Component } from '@angular/core';
import { Tarea } from '../../models/tarea.model';
import { TareasCrudService } from '../../services/tareas-crud.service';
import { FormTareaComponent } from '../form-tarea/form-tarea.component';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [FormsModule, FormTareaComponent],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.scss'
})
export class TareasComponent {

  tareas: Tarea[] = [];
  botonNuevaTarea: boolean = false; 
  tareaSeleccionada!: Tarea;
  tareasSubscription!: Subscription;
  esEdicion: boolean = false; 

  constructor(private readonly tareaCrud: TareasCrudService) {}

  ngOnInit(): void {
    this.tareasSubscription = this.tareaCrud.tareas$.subscribe(tareas => {
      this.tareas = tareas;
      console.log("Tareas actualizadas:::", this.tareas);
    });
  }


  abrirFormTareas(tarea?: Tarea) {
    this.botonNuevaTarea = true; 
    
    if (tarea) {
      this.esEdicion = true; 
      this.tareaSeleccionada = {...tarea}; 
    } else {
      this.esEdicion = false;
      this.tareaSeleccionada = { id: 0, titulo: '', descripcion: '', completada: false }; 
    }
  }

  guardarTarea(tarea: Tarea) {
    if (this.esEdicion) {
      this.tareaCrud.actualizarTarea(tarea)
      console.log("Tareas:::", this.tareas);
    } else {
      this.tareaCrud.agregarTarea(tarea);
      console.log("Tareas:::", this.tareas);
    }
    this.resetearFormulario();
  }

  eliminarTarea(id: number) {
    this.tareaCrud.eliminarTarea(id);
    this.tareas = this.tareaCrud.obtenerTareas();
    console.log("Tareas:::", this.tareas);
  }

  private resetearFormulario() {
    this.botonNuevaTarea = false;  
    this.esEdicion = false;  
    this.tareaSeleccionada = { id: 0, titulo: '', descripcion: '', completada: false };
  }

  ngOnDestroy(): void {
    if (this.tareasSubscription) {
      this.tareasSubscription.unsubscribe();
    }
  }
}
