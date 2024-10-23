import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tarea } from '../../models/tarea.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-tarea',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-tarea.component.html',
  styleUrl: './form-tarea.component.scss'
})
export class FormTareaComponent {

  nuevaTarea: Tarea = {id: 0, titulo: '', descripcion: '', completada: false }; 
  mensajeError: string | null = null;

  @Input() tarea!: Tarea; 
  @Input() edicion!: boolean;
  @Output() tareaCreada = new EventEmitter<any>();
 
  ngOnInit() {
    this.resetearFormulario();
  }

  ngOnChanges() {
    this.resetearFormulario(); // Resetear si la tarea de entrada cambia
  }

  resetearFormulario() {
    if (this.tarea) {
      this.nuevaTarea = { ...this.tarea };  // Cargar los datos de la tarea si existe
    } else {
      this.nuevaTarea = { id: 0, titulo: '', descripcion: '', completada: false };  // Resetear para nueva tarea
    }
    this.mensajeError = null; // Limpiar mensaje de error
  }

  agregarActualizarTarea() {
    if (this.nuevaTarea.titulo && this.nuevaTarea.descripcion) {
        this.tareaCreada.emit({ ...this.nuevaTarea });
        this.nuevaTarea = {id: 0, titulo: '', descripcion: '', completada: false }; 
        this.mensajeError = null;
    } else {
      this.mensajeError = 'Los campos de usuario y contraseña son obligatorios.';
    }
  }

  hayError(): boolean {
    return this.mensajeError !== null; 
  }

}
