import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class ApiFichaService {
  getFichaById(id: number) {
    const options: HttpOptions = {
      url: 'http://localhost:8080/ficha/' + id,
      params: {},
    };

    return CapacitorHttp.get(options).then((response) => {
      return response.data;
    });
  }

  getFichas() {
    const options: HttpOptions = {
      url: 'http://localhost:8080/ficha',
      params: {},
    };

    return CapacitorHttp.get(options).then((response) => {
      return response.data;
    });
  }

  postFicha(ficha: any) {
    const options: HttpOptions = {
      url: 'http://localhost:8080/ficha',
      headers: {
        'Content-Type': 'application/json',
      },
      data: ficha,
    };

    return CapacitorHttp.post(options).then((response) => {
      return response.data;
    });
  }

  deleteFicha(id: number) {
    const options: HttpOptions = {
      url: 'http://localhost:8080/ficha/' + id,
      params: {},
    };

    return CapacitorHttp.delete(options).then((response) => {
      return response.data;
    });
  }

  putFicha(ficha: any) {
    const options: HttpOptions = {
      url: 'http://localhost:8080/ficha/' + ficha.id,
      headers: {
        'Content-Type': 'application/json',
      },
      data: ficha,
    };

    return CapacitorHttp.put(options).then((response) => {
      return response.data;
    });
  }

  getFichasByTecnico(apodoTecnico: string) {
    const options: HttpOptions = {
      url: 'http://localhost:8080/ficha/tecnico/' + apodoTecnico,
      params: {},
    };

    return CapacitorHttp.get(options).then((response) => {
      return response.data;
    });
  }

  getFichasByCliente(id: number) {
    const options: HttpOptions = {
      url: 'http://localhost:8080/ficha/cliente/' + id,
      params: {},
    };

    return CapacitorHttp.get(options).then((response) => {
      return response.data;
    });
  }

  getFichasByDia(dia: string) {
    const options: HttpOptions = {
      url: 'http://localhost:8080/ficha/fecha/' + dia,
      params: {},
    };

    return CapacitorHttp.get(options).then((response) => {
      return response.data;
    });
  }

  getFichasByFechas(fecha: string, fecha2: string) {
    const options: HttpOptions = {
      url: 'http://localhost:8080/ficha/fecha/' + fecha + '/' + fecha2,
      params: {},
    };

    return CapacitorHttp.get(options).then((response) => {
      return response.data;
    });
  }

  formatearFecha(fechaISO: string): string {
    if (!fechaISO) return '';
    const partes = fechaISO.split('-'); // ["2024", "03", "20"]
    return `${partes[2]}/${partes[1]}/${partes[0]}`; // "20/03/2024"
  }
}
