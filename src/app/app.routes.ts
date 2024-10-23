import { Routes } from '@angular/router';
import { AutenticacionComponent } from './components/autenticacion/autenticacion.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { autenticacionGuard } from './guards/autenticacion.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: AutenticacionComponent },
    { path: 'tareas', component: TareasComponent, canActivate: [autenticacionGuard]}
];
