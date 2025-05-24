import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'clientes',
        loadChildren: () =>
          import('../model/cliente/cliente.module').then(m => m.ClientePageModule)
      },
      {
        path: 'tecnicos',
        loadChildren: () =>
          import('../model/tecnico/tecnico.module').then(m => m.TecnicoPageModule)
      },
      {
        path: 'fichas',
        loadChildren: () =>
          import('../model/ficha/ficha.module').then(m => m.FichaPageModule)
      },
      { path: '', redirectTo: 'clientes', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}