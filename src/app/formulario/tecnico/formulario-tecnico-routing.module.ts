import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioTecnicoPage } from './formulario-tecnico.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioTecnicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioTecnicoPageRoutingModule {}
