import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Pedido } from './shared/pedido.model';

import { URL_API } from './app.api';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdemCompraService {

  constructor(private httpClient: HttpClient) { }

  public efetivarCompra(pedido: Pedido): Observable<any> {
    return this.httpClient.post(
      `${URL_API}/pedidos`,
      pedido
    ).pipe(map((response: Response) => response['id']))
  }
}