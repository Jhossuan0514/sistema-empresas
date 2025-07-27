import { Routes } from '@angular/router';
import { EmpresaForm } from './features/empresa/empresa-form/empresa-form';
import { EmpresaList } from './features/empresa/empresa-list/empresa-list';
import { HomePage } from './homepage/home-page/home-page';
import { LoginComponent } from './features/login/login';
import { DashboardComponent } from './features/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';
import { App } from './app';

export const routes: Routes = [
  // Redirección inicial
  { path: '', component: HomePage }, // Ruta principal pública

  // RUTA DEL LOGIN: NO INCLUYE EL LAYOUT (AppComponent)
  { path: 'login', component: LoginComponent },

 
  {
    path: '', // Este path vacío significa que el shell (App) se renderizará para las rutas hijas
    component: App, // El AppComponent que contiene el mat-sidenav y toolbar
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'empresa', component: EmpresaForm },
      { path: 'listaEmpresa', component: EmpresaList },
      { path: 'editar-empresa/:id', loadComponent: () => import('./features/empresa/empresa-form/empresa-form').then(m => m.EmpresaForm) },
      // ¡IMPORTANTE!: No poner una ruta '' aquí si ya tienes un 'redirectTo' general
      // Ni un pathMatch: 'full' en una ruta hija con path: ''
    ]
  },

  // Ruta comodín para cualquier otra ruta no definida
  { path: '**', redirectTo: 'login' }
];