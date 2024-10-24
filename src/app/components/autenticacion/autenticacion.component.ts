import { Component } from '@angular/core';
import { AutenticarService } from '../../services/autenticar.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-autenticacion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './autenticacion.component.html',
  styleUrl: './autenticacion.component.scss'
})
export class AutenticacionComponent {
  
  usuario: Usuario = {nombreUsuario: '', contrasena: ''};
  mensajeError: string | null = null;

  constructor(private readonly autenticar: AutenticarService, private readonly router: Router) {}

  login(): void {
    this.mensajeError = null;
    
    if (!this.usuario.nombreUsuario || !this.usuario.contrasena) {
      this.mensajeError = 'Los campos de usuario y contraseña son obligatorios.';
      return;
    }

    if (this.autenticar.ingresar(this.usuario)) {
      this.router.navigate(['/tareas']);      
    } else {
      this.mensajeError = 'Usuario o contraseña incorrectos. Por favor intente de nuevo o reasigne.';
    }
  }

  hayError(): boolean {
    return this.mensajeError !== null; 
  }
}
