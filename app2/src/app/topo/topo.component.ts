import { Component, OnInit } from '@angular/core';
import { OfertasService } from './../ofertas.service';
import { Oferta } from './../shared/oferta.model';
import { Observable, Subject, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa
      .pipe(debounceTime(1000)) //executa a ação do switchMap após 1 segundo
      .pipe(distinctUntilChanged())
      .pipe(switchMap((termo: string) => {
        //console.log('requisição HTTP para API')

        if (termo.trim() === '') {
          //retornar um observable de array de ofertas vazio
          return of<Oferta[]>([])
        }
        return this.ofertasService.pesquisaOfertas(termo)
      }))
      .pipe(catchError((err: any) => {
        // console.log(err)
        return of<Oferta[]>([])
      }))
  }

  public pesquisa(termoDaBusca: string): void {
    //console.log('keyup caractere: ', termoDaBusca)
    this.subjectPesquisa.next(termoDaBusca)

    // this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca)

    // this.ofertas.subscribe(
    //   (ofertas: Oferta[]) => console.log(ofertas),
    //   (erro: any) => console.log('Erro status', erro.status),
    //   () => console.log('Fluxo de eventos completo!')
    // )
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('')
  }

}
