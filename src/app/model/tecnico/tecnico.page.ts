import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiTecnicoService } from 'src/app/services/tecnico/api-tecnico.service';
import { FormularioTecnicoPage } from 'src/app/formulario/tecnico/formulario-tecnico.page';

@Component({
  selector: 'app-tecnico',
  templateUrl: './tecnico.page.html',
  styleUrls: ['./tecnico.page.scss'],
  standalone: false,
})
export class TecnicoPage {
  public tecnicos: any[] = [];
  public tecnicoFiltrado: any = null;

  tipoBusqueda: 'apodo' | 'telefono' | null = null;
  valorBusqueda: string = '';

  constructor(
    private apiService: ApiTecnicoService,
    private modalController: ModalController
  ) {
    this.tecnicoFiltrado = null;
    this.cargarTecnico();
  }

  cargarTecnico() {
    this.apiService.getTecnicos().then((tecnicos) => {
      this.tecnicos = tecnicos;
      console.log(this.tecnicos);
    });
  }

  limpiarBusqueda() {
    this.tecnicoFiltrado = null;
    this.valorBusqueda = '';
    this.tipoBusqueda = null;
  }

  buscarTecnico() {
    if (this.tipoBusqueda === 'apodo') {
      this.apiService.getTecnicobyApodo(this.valorBusqueda).then((tecnico) => {
        this.tecnicoFiltrado = tecnico;
        console.log(this.tecnicoFiltrado);
      });
    } else if (this.tipoBusqueda === 'telefono') {
      this.apiService.getTecnicoByPhone(this.valorBusqueda).then((tecnico) => {
        this.tecnicoFiltrado = tecnico;
        console.log(this.tecnicoFiltrado);
      });
    }
  }

  getTecnico() {
    if (this.valorBusqueda !== null) {
      this.apiService.getTecnicobyApodo(this.valorBusqueda).then((tecnico) => {
        this.tecnicoFiltrado = tecnico;
        console.log(this.tecnicoFiltrado);
      });
    }
  }

  async abrirFormularioTecnico() {
  const modal = await this.modalController.create({
    component: FormularioTecnicoPage,
    componentProps: {
      esEdicion: false // Modo crear
    },
  });

  await modal.present();
  console.log('abrir formulario tecnico');

  const { data } = await modal.onWillDismiss();
  if (data) {
    this.cargarTecnico();
  }
}

  borrarTecnico(tecnico: any) {
    this.apiService.deleteTecnico(tecnico.apodo).then(() => {
      this.cargarTecnico();
    });
  }

  async editarTecnico(tecnico: any) {
  const modal = await this.modalController.create({
    component: FormularioTecnicoPage,
    componentProps: {
      tecnico: tecnico || {},
      esEdicion: true         
    },
  });

  await modal.present();
  console.log('abrir formulario tecnico');

  const { data } = await modal.onWillDismiss();
  if (data) {
    this.cargarTecnico();
  }
}
}
