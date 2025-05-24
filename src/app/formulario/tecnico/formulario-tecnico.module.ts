import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormularioTecnicoPageRoutingModule } from './formulario-tecnico-routing.module';
import { FormularioTecnicoPage } from './formulario-tecnico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioTecnicoPageRoutingModule,
    FormularioTecnicoPage
  ],
})
export class FormularioTecnicoPageModule {}
