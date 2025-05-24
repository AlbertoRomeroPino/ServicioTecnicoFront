import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/clientes',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'cliente-page',
    loadChildren: () => import('./model/cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'cliente-page',
    loadChildren: () => import('./model/ficha/ficha.module').then( m => m.FichaPageModule)
  },
  {
    path: 'cliente-page',
    loadChildren: () => import('./model/tecnico/tecnico.module').then( m => m.TecnicoPageModule)
  },
  {
    path: 'formulario-tecnico',
    loadChildren: () => import('./formulario/tecnico/formulario-tecnico.module').then( m => m.FormularioTecnicoPageModule)
  },
  {
    path: 'formulario-ficha',
    loadChildren: () => import('./formulario/ficha/formulario-ficha.module').then( m => m.FormularioFichaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
