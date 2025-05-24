import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioFichaPage } from './formulario-ficha.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioFichaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioFichaPageRoutingModule {}
