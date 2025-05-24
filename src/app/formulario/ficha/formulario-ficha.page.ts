import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { ApiFichaService } from 'src/app/services/ficha/api-ficha.service';
import { ApiClienteService } from 'src/app/services/Cliente/api-cliente.service';
import { ApiTecnicoService } from 'src/app/services/tecnico/api-tecnico.service';
@Component({
  selector: 'app-formulario-ficha',
  templateUrl: './formulario-ficha.page.html',
  styleUrls: ['./formulario-ficha.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class FormularioFichaPage implements OnInit {
  ficha = {
    roturaCliente: '',
    diagnosticoTecnico: '',
    presupuesto: null,
    fechaEntrada: '',
    fechaSalida: '',
    cliente: null,
    tecnico: null,
  };

  clientes: any[] = [];
  tecnicos: any[] = [];

  constructor(
    private apiCliente: ApiClienteService,
    private apiTecnico: ApiTecnicoService,
    private apiFicha: ApiFichaService,
    private modalCtrl : ModalController
  ) {
    
  }

  ngOnInit() {
    this.apiCliente
      .getClientes()
      .then((clientes) => (this.clientes = clientes));
    this.apiTecnico
      .getTecnicos()
      .then((tecnicos) => (this.tecnicos = tecnicos));
  }

  compareById = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);
  compareByApodo = (o1: any, o2: any) =>
    o1 && o2 ? o1.apodo === o2.apodo : o1 === o2;

  guardarFicha() {
    this.apiFicha.postFicha(this.ficha).then(() => {
      this.modalCtrl.dismiss(true);
    });
  }

  actualizarFicha() {
    this.apiFicha.putFicha(this.ficha).then(() => {
      this.modalCtrl.dismiss(true);
    });
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
