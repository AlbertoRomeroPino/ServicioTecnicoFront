import { HttpResponse } from '@angular/common/module.d-CnjH8Dlt';
import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class ApiClienteService {
  getCliente(id: number) {
    const options: HttpOptions = {
      url: 'http://localhost:8080/cliente/' + id,
      params: {},
    };

    return CapacitorHttp.get(options).then((response) => {
      return response.data;
    });
  }

  getClientes() {
    const options: HttpOptions = {
      url: 'http://localhost:8080/cliente',
      params: {},
    };

    return CapacitorHttp.get(options).then((response) => {
      return response.data;
    });
  }

  postCliente(cliente: any) {
    const options: HttpOptions = {
      url: 'http://localhost:8080/cliente',
      headers: {
        'Content-Type': 'application/json',
      },
      data: cliente,
    };

    return CapacitorHttp.post(options).then((response) => {
      return response.data;
    });
  }

  deleteCliente(id: number) {
    const options: HttpOptions = {
      url: 'http://localhost:8080/cliente/' + id,
      params: {},
    };

    return CapacitorHttp.delete(options).then((response) => {
      return response.data;
    });
  }

  putCliente(cliente: any) {
    const options: HttpOptions = {
      url: 'http://localhost:8080/cliente/' + cliente.id,
      headers: {
        'Content-Type': 'application/json',
      },
      data: cliente,
    };

    return CapacitorHttp.put(options).then((response) => {
      return response.data;
    });
  }
}
