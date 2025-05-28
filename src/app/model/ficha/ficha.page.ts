import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormularioFichaPage } from 'src/app/formulario/ficha/formulario-ficha.page';
import { ApiClienteService } from 'src/app/services/Cliente/api-cliente.service';
import { ApiFichaService } from 'src/app/services/ficha/api-ficha.service';
import { ApiTecnicoService } from 'src/app/services/tecnico/api-tecnico.service';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.page.html',
  styleUrls: ['./ficha.page.scss'],
  standalone: false,
})
export class FichaPage {
  public fichas: any[] = [];
  public fichaFiltrado: any = null;
  public clienteFicha: any = null;
  public tecnicoFicha: any = null;

  clientes: any[] = []; // Cada cliente tiene un array fichas
  tecnicos: any[] = []; // Cada técnico tiene un array fichas

  tipoBusqueda: 'id' | 'tecnico' | 'cliente' | 'dia' | 'fechas' | null = null;
  valorBusqueda: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';

  constructor(
    private apiService: ApiFichaService,
    private apiServiceTecnico: ApiTecnicoService,
    private apiServiceCliente: ApiClienteService,
    private modalController: ModalController
  ) {
    this.fichaFiltrado = null;
    this.cargarFichas();
    this.cargarClientes();
    this.cargarTecnicos();
  }

  cargarClientes() {
    this.apiServiceCliente.getClientes().then((clientes) => {
      this.clientes = clientes;
      console.log(this.clientes);
    });
  }
  cargarTecnicos() {
    this.apiServiceTecnico.getTecnicos().then((tecnicos) => {
      this.tecnicos = tecnicos;
      console.log(this.tecnicos);
    });
  }

  cargarFichas() {
    this.apiService.getFichas().then((fichas) => {
      this.fichas = fichas;
      console.log(this.fichas);
    });
  }

  limpiarBusqueda() {
    this.fichaFiltrado = null;
    this.valorBusqueda = '';
    this.fechaInicio = '';
    this.fechaFin = '';
    this.tipoBusqueda = null;
    this.cargarFichas();
  }

  getFicha() {
    if (this.tipoBusqueda === 'id') {
      this.apiService.getFichaById(Number(this.valorBusqueda)).then((ficha) => {
        this.fichaFiltrado = ficha;
        this.buscarClienteTecnico(ficha);
      });
    } else if (this.tipoBusqueda === 'tecnico') {
      this.apiService.getFichasByTecnico(this.valorBusqueda).then((ficha) => {
        this.fichaFiltrado = ficha;
        this.buscarClienteTecnico(ficha);
      });
    } else if (this.tipoBusqueda === 'cliente') {
      this.apiService
        .getFichasByCliente(Number(this.valorBusqueda))
        .then((ficha) => {
          this.fichaFiltrado = ficha;
          this.buscarClienteTecnico(ficha);
        });
    } else if (this.tipoBusqueda === 'dia') {
      this.apiService.getFichasByDia(this.valorBusqueda).then((ficha) => {
        this.fichaFiltrado = ficha;
        console.log(this.fichaFiltrado);
        this.buscarClienteTecnico(ficha);
      });
    } else if (this.tipoBusqueda === 'fechas') {
      this.apiService.getFichasByFechas(this.fechaInicio, this.fechaFin).then((fichas) => {
        this.fichas = fichas;
        console.log(this.fichas);
        this.buscarClienteTecnico(fichas);
      });
    }
  }


  
  getTecnicoPorFicha(ficha: any) {
    return this.tecnicos.find((tecnico) =>
      tecnico.fichas.some((f: any) => f.id === ficha.id)
    );
  }

  getClientePorFicha(ficha: any) {
    return this.clientes.find((cliente) =>
      cliente.fichas.some((f: any) => f.id === ficha.id)
    );
  }

  buscarClienteTecnico(ficha: any) {
    this.clienteFicha = null;
    this.tecnicoFicha = null;

    if (Array.isArray(ficha)) {
      return;
    }

    this.clienteFicha = this.clientes.find((cliente) =>
      cliente.fichas.some((f: any) => f.id === ficha.id)
    );

    this.tecnicoFicha = this.tecnicos.find((tecnico) =>
      tecnico.fichas.some((f: any) => f.id === ficha.id)
    );
  }

  borrarFicha(ficha: any) {
    this.apiService.deleteFicha(ficha.id).then(() => {
      this.cargarFichas();
    });
  }
  async editarFicha(ficha: any) {
    const modal = await this.modalController.create({
      component: FormularioFichaPage,
      componentProps: {
        ficha: ficha || {},
      },
    });
    await modal.present();
    console.log('abrir formulario ficha');

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.cargarFichas();
    }
  }

  async abrirFormularioFicha() {
    const modal = await this.modalController.create({
      component: FormularioFichaPage,
    });
    await modal.present();
    console.log('abrir formulario cliente');

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.cargarFichas();
    }
  }
}
