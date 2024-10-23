import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AutenticarService {

  private readonly usuario: Usuario = {nombreUsuario:'admin', contrasena:'contrasenaSegura123!'};
  private autenticado = false;

  ingresar(usuario: Usuario): boolean {
    if (usuario.nombreUsuario === this.usuario.nombreUsuario && usuario.contrasena === this.usuario.contrasena) {
      this.autenticado = true;
      if (typeof window !== 'undefined' && sessionStorage) {
        sessionStorage.setItem('auth', 'true');
      }
      return true;
    }
    return false;
  }

  isAutenticado(): boolean {
    if (typeof window !== 'undefined' && sessionStorage) {
      const auth = sessionStorage.getItem('auth');
      return auth === 'true';
    }
    return this.autenticado;
  }

  salir(): void {
    this.autenticado = false;
    if (typeof window !== 'undefined' && sessionStorage) {
      sessionStorage.removeItem('auth');
    }
  }
}
