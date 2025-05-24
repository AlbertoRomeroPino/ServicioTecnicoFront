import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ApiTecnicoService } from 'src/app/services/tecnico/api-tecnico.service';

@Component({
  selector: 'app-formulario-tecnico',
  templateUrl: './formulario-tecnico.page.html',
  styleUrls: ['./formulario-tecnico.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class FormularioTecnicoPage {
  @Input() tecnico = {
    apodo: '',
    nombre: '',
    apellido: '',
    numeroTelefono: '',
  };

  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiTecnicoService
  ) {}

  guardarTecnico() {
    this.apiService.postTecnico(this.tecnico).then(() => {
      this.modalCtrl.dismiss(true);
    });
  }

  actualizarTecnico() {
  this.apiService.putTecnico(this.tecnico)
    .then(() => {
      this.modalCtrl.dismiss(true); // Éxito
    })
    .catch((error) => {
      console.error('Error al actualizar el técnico:', error);
      // Aquí puedes mostrar un mensaje de error si quieres
      alert('No se pudo actualizar el técnico. Inténtalo de nuevo.');
    });
}


  cerrar() {
    this.modalCtrl.dismiss();
  }
}
