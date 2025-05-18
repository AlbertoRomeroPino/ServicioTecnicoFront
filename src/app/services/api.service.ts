import { HttpResponse } from '@angular/common/module.d-CnjH8Dlt';
import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  getFicha(id: number) {
    const options: HttpOptions = {
      url: 'http://localhost:8080/ficha/' + id,
      params: {},
    };

    return CapacitorHttp.get(options).then((response) => {
      return response.data;
    });
  }
}
