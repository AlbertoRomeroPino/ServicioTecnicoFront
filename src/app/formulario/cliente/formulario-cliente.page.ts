import { Component, Input } from '@angular/core';
import { IonicModule, ModalController, NavParams } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiClienteService } from '../../services/Cliente/api-cliente.service';

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.page.html',
  styleUrls: ['./formulario-cliente.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class FormularioClientePage {
  @Input() cliente = {
    id: null,
    dni: '',
    nombre: '',
    numeroTelefono: '',
  };

  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiClienteService
  ) {}

  guardarCliente() {
    this.apiService.postCliente(this.cliente).then(() => {
      this.modalCtrl.dismiss(true);
    });
  }

  actualizarCliente() {
    this.apiService.putCliente(this.cliente).then(() => {
      this.modalCtrl.dismiss(true);
    });
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}