import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { ApiFichaService } from 'src/app/services/ficha/api-ficha.service';
import { ApiClienteService } from 'src/app/services/Cliente/api-cliente.service';
import { ApiTecnicoService } from 'src/app/services/tecnico/api-tecnico.service';
import { identifierName } from '@angular/compiler';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ApiFotoService } from 'src/app/services/imagen/api-foto.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-formulario-ficha',
  templateUrl: './formulario-ficha.page.html',
  styleUrls: ['./formulario-ficha.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class FormularioFichaPage implements OnInit {
  ficha = {
    id: null,
    roturaCliente: '',
    diagnosticoTecnico: '',
    presupuesto: null,
    fechaEntrada: '',
    fechaSalida: '',
    cliente: {
      id: null,
    },
    tecnicoApodo: {
      apodo: '',
    },
  };

  // para mostrar la imagen en el formulario (base64 o path)
  foto: string | undefined;
  fileToUpload: File | null = null;

  clientes: any[] = [];
  tecnicos: any[] = [];

  constructor(
    private apiCliente: ApiClienteService,
    private apiTecnico: ApiTecnicoService,
    private apiFicha: ApiFichaService,
    private ApiFoto: ApiFotoService,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.apiCliente
      .getClientes()
      .then((clientes) => (this.clientes = clientes));
    this.apiTecnico
      .getTecnicos()
      .then((tecnicos) => (this.tecnicos = tecnicos));
  }

  compareById = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);

  guardarFicha() {
    this.apiFicha.postFicha(this.ficha).then(() => {
      this.modalCtrl.dismiss(true);
    });
  }

  actualizarFicha() {
    const tecnico = this.tecnicos.find((tecnico) =>
      tecnico.fichas.some((f: any) => f.id === this.ficha.id)
    );

    const cliente = this.clientes.find((cliente) =>
      cliente.fichas.some((f: any) => f.id === this.ficha.id)
    );

    // 2) Me aseguro de que ficha.tecnicoApodo y ficha.cliente existen
    if (!this.ficha.tecnicoApodo) {
      this.ficha.tecnicoApodo = { apodo: '' };
    }
    if (!this.ficha.cliente) {
      this.ficha.cliente = { id: null };
    }

    // 3) Ya puedo asignar sin error
    this.ficha.tecnicoApodo.apodo = tecnico?.apodo;
    this.ficha.cliente.id = cliente?.id;

    // 4) Envío al servicio
    console.log(this.ficha);
    this.apiFicha.putFicha(this.ficha).then(() => {
      this.modalCtrl.dismiss(true);
    });
  }

  // Función para tomar o seleccionar foto
  async seleccionarFoto(source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: source,
        webUseInput: true,
      });

      this.foto = `data:image/jpeg;base64,${image.base64String}`;
      this.fileToUpload = this.base64ToFile(image.base64String!, 'imagen.jpg');

      // Subir automáticamente
      this.subirImagen();
    } catch (error) {
      console.error('Error al obtener foto', error);
    }
  }

  // Convertir base64 a File
  base64ToFile(base64: string, filename: string): File {
    const byteString = window.atob(base64);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return new File([blob], filename, { type: 'image/jpeg' });
  }

  // Función para subir imagen junto con ficha_id
  subirImagen() {
    if (!this.fileToUpload) {
      alert('Selecciona una imagen primero');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('ficha_id', this.ficha.id ? '' + this.ficha.id : '');

    this.ApiFoto.postImagen(formData)
      .then((response) => {
        console.log('Imagen subida correctamente', response);
        alert('Imagen subida correctamente');
      })
      .catch((error) => {
        console.error('Error al subir imagen', error);
      });
  }

  async mostrarOpcionesFoto() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Seleccionar foto',
      buttons: [
        {
          text: 'Tomar una foto',
          icon: 'camera',
          handler: () => {
            this.seleccionarFoto(CameraSource.Camera);
          },
        },
        {
          text: 'Elegir de la galería',
          icon: 'image',
          handler: () => {
            this.seleccionarFoto(CameraSource.Photos);
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
