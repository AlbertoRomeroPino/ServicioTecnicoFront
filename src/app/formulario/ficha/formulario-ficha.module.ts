import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioFichaPageRoutingModule } from './formulario-ficha-routing.module';
import { FormularioFichaPage } from './formulario-ficha.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioFichaPageRoutingModule,
    FormularioFichaPage
  ],
})
export class FormularioFichaPageModule {}
