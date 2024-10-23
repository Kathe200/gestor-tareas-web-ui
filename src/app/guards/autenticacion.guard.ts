import { CanActivateFn, Router } from '@angular/router';
import { AutenticarService } from '../services/autenticar.service';
import { inject } from '@angular/core';

export const autenticacionGuard: CanActivateFn = (route, state) => {

  const autenticarService = inject(AutenticarService);

    if (autenticarService.isAutenticado()) {
      return true;
    } else {
      const router = inject(Router);
      router.navigate(['/login']);
      return false; // Bloquear acceso
    }

};
