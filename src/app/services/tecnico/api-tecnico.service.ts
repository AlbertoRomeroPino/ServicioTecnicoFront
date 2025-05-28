import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class ApiTecnicoService {
  getTecnicobyApodo(id: String) {
    const options: HttpOptions = {
      url: 'http://localhost:8080/tecnico/byApodo/' + id,
      params: {},
    };

    return CapacitorHttp.get(options).then((response) => {
      return response.data;
    });
  }

  getTecnicos() {
    const options: HttpOptions = {
      url: 'http://localhost:8080/tecnico',
      params: {},
    };

    return CapacitorHttp.get(options).then((response) => {
      return response.data;
    });
  }

  getTecnicoByPhone(phone: String) {
    const options: HttpOptions = {
      url: 'http://localhost:8080/tecnico/byPhone/' + phone,
      params: {},
    };

    return CapacitorHttp.get(options).then((response) => {
      return response.data;
    });
  }
  
  postTecnico(tecnico: any) {
    const options: HttpOptions = {
      url: 'http://localhost:8080/tecnico',
      headers: {
        'Content-Type': 'application/json',
      },
      data: tecnico,
    };

    return CapacitorHttp.post(options).then((response) => {
      return response.data;
    });
  }

  deleteTecnico(id: String) {
    const options: HttpOptions = {
      url: 'http://localhost:8080/tecnico/' + id,
      params: {},
    };

    return CapacitorHttp.delete(options).then((response) => {
      return response.data;
    });
  }

  putTecnico(tecnico: any) {
    const options: HttpOptions = {
      url: 'http://localhost:8080/tecnico',
      headers: {
        'Content-Type': 'application/json',
      },
      data: tecnico,
    };

    return CapacitorHttp.put(options).then((response) => {
      return response.data;
    });
  }
}
