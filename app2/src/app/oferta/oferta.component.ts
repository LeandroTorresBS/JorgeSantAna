import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from './../ofertas.service';
import { Oferta } from './../shared/oferta.model';
// import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  ngOnInit(): void {
    //this.route.snapshot.params['id']
    // this.route.params.subscribe((parametro: any) => {
    // })

    this.route.params.subscribe((parametros: Params) => {
      this.ofertasService.getOfertaPorId(parametros.id)
        .then((oferta: Oferta) => {
          this.oferta = oferta
        })
    })

    // this.route.params.subscribe(
    //   (parametro: any) => { console.log(parametro) },
    //   (erro: any) => { console.log(erro) },
    //   () => console.log('Processamento classificado como concluído!')
    // )

    // // observable (observável)
    // let meuObservableTeste = new Observable((observer: Observer<number>) => {
    //   observer.next(1)
    //   observer.next(2)
    //   // observer.error('Algum erro foi encontrado na stream de eventos')
    //   observer.complete()
    // })

    // // observable (observador)
    // meuObservableTeste.subscribe(
    //   (resultado: any) => console.log(resultado + 10),
    //   (erro: string) => console.log(erro),
    //   () => console.log('Stream de eventos foi finalizada')

    // )

  }

}