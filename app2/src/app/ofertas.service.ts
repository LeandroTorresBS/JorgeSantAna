import { Oferta } from './shared/oferta.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from './app.api';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators'

@Injectable()
export class OfertasService {

    //private url_api = 'http://localhost:3000/ofertas'

    constructor(private http: HttpClient) {

    }


    public getOfertas(): Promise<Oferta[]> {
        //efetura uma requisição HTTP
        return this.http.get(`${URL_API}/ofertas?destaque=true`).toPromise()
            .then((resposta: any) => resposta)
        //retornar um promise Oferta[]
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`).toPromise()
            .then((resposta: any) => resposta)
    }

    public getOfertaPorId(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`).toPromise()
            .then((resposta: any) => resposta[0])
    }

    public getComoUsarOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/como-usar?id=${id}`).toPromise()
            .then((resposta: any) => resposta[0].descricao)
    }

    public getOndeFicaOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/onde-fica?id=${id}`).toPromise()
            .then((resposta: any) => resposta[0].descricao)
    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
            .pipe(retry(10))
            .pipe(map((resposta: any) => resposta))
    }

    // public getOfertas2(): Promise<Oferta[]> {
    //     return new Promise((resolve, reject) => {
    //         //algum tipo de processamento, que ao finalizar, chama a função resolve ou a função reject
    //         let funfou = true

    //         if (funfou) {
    //             setTimeout(() => resolve(this.ofertas), 3000)
    //         } else {
    //             reject({ codigo_erro: 404, mensagem_erro: 'Servidor não encontrado' })
    //         }
    //     })
    //         .then((ofertas: Oferta[]) => {
    //             //fazer alguma tratativa
    //             return ofertas
    //         })
    //         .then((ofertas: Oferta[]) => {
    //             //fazer outra tratativa
    //             return new Promise((resolve2, reject2) => {
    //                 setTimeout(() => { resolve2(ofertas) }, 3000)
    //             })
    //         })
    //         .then((ofertas: Oferta[]) => {
    //             return ofertas
    //         })
    // }
}