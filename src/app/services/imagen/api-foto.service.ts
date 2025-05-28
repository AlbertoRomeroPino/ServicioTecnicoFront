import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Capacitor, CapacitorHttp, HttpOptions } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class ApiFotoService {
  getByIdFicha(id: number) {
    const options: HttpOptions = {
      url: 'http://localhost:8080/foto/byIdFicha/' + id,
      params: {},
    };

    return CapacitorHttp.get(options).then((response) => {
      return response.data;
    });
  }
  postImagen(foto: any) {
    const options: HttpOptions = {
      url: 'http://localhost:8080/foto',
      headers: {
        'Content-Type': 'application/json',
      },
      data: foto,
    };

    return CapacitorHttp.post(options).then((response) => {
      return response.data;
    });
  }

  deleteFoto(id: number) {
    const options: HttpOptions = {
      url: 'http://localhost:8080/foto/' + id,
      params: {},
    };

    return CapacitorHttp.delete(options).then((response) => {
      return response.data;
    });
  }
}

