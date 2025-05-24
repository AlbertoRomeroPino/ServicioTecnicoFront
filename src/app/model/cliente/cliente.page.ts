import { Component } from '@angular/core';
import { ApiClienteService } from 'src/app/services/Cliente/api-cliente.service';
import { ModalController } from '@ionic/angular';
import { FormularioClientePage } from '../../formulario/cliente/formulario-cliente.page';
@Component({
  selector: 'app-cliente',
  templateUrl: 'cliente.page.html',
  styleUrls: ['cliente.page.scss'],
  standalone: false,
})
export class ClientePage {
  public id: number | null;
  public clientes: any[] = [];
  public clienteFiltrado: any = null;

  constructor(
    private apiService: ApiClienteService,
    private modalController: ModalController
  ) {
    this.id = null;
    this.clienteFiltrado = null;
    this.cargarClientes();
  }

  cargarClientes() {
    this.apiService.getClientes().then((clientes) => {
      this.clientes = clientes;
      console.log(this.clientes);
    });
  }

  limpiarBusqueda() {
    this.clienteFiltrado = null;
    this.id = null;
  }
  getCliente() {
    if (this.id !== null) {
      this.apiService.getCliente(this.id).then((cliente) => {
        this.clienteFiltrado = cliente;
        console.log(this.clienteFiltrado);
      });
    }
  }

  async abrirFormularioCliente() {
    const modal = await this.modalController.create({
      component: FormularioClientePage,
    });
    await modal.present();
    console.log('abrir formulario cliente');

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.cargarClientes();
    }
  }

  borrarCliente(cliente: any) {
    this.apiService.deleteCliente(cliente.id).then(() => {
      this.cargarClientes();
    });
  }

  async editarCliente(cliente: any) {
    const modal = await this.modalController.create({
      component: FormularioClientePage,
      componentProps: {
        cliente: { ...cliente }, // Pasas una copia del cliente al modal
      },
    });
    await modal.present();

    // Opcional: refresca la lista al cerrar el modal
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.cargarClientes();
    }
  }
}
