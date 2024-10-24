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
    this.resetearFormulario(); 
  }

  resetearFormulario() {
    if (this.tarea) {
      this.nuevaTarea = { ...this.tarea };  
    } else {
      this.nuevaTarea = { id: 0, titulo: '', descripcion: '', completada: false };  
    }
    this.mensajeError = null; 
  }

  agregarActualizarTarea() {
    if (this.nuevaTarea.titulo && this.nuevaTarea.descripcion) {
        this.tareaCreada.emit({ ...this.nuevaTarea });
        this.nuevaTarea = {id: 0, titulo: '', descripcion: '', completada: false }; 
        this.mensajeError = null;
    } else {
      this.mensajeError = 'Los campos de titulo y descripción de la tarea son obligatorios.';
    }
  }

  hayError(): boolean {
    return this.mensajeError !== null; 
  }

}
