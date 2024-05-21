import { Component, OnInit, output } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IDataPayload } from '@models/IdataPayload.model';
import { Iepisodio } from '@models/Iepisodio.model';
import { SepisodioService } from '@services/sepisodio.service';
import { CommomComponentModule } from '@modules/commomComponent.module';

/**
 * Componente de episódios
 * @description Este é o componente da listagem de episódios que aparece na home na ultima aba
 * @example
 * <app-epsiodios></app-epsiodios>
 */
@Component({
  selector: 'app-episodios',
  standalone: true,
  imports: [ 
    CommomComponentModule
  ],
  templateUrl: './episodios.component.html',
  styleUrl: './episodios.component.scss'
})
export class EpisodiosComponent implements OnInit {

  /**
   * @param episodios$ observable que representa os dados do episodios
   * @param setTotalRecords output que envia para o componente pai (home) a quantidade de episodios. informação usada para paginação
   */

  episodios$!: Observable<IDataPayload<Iepisodio>>;
  setTotalRecords = output<number>();

  constructor(private service: SepisodioService, private router: Router) {
  }
  
  /**
   * @description inicializa a pesquisa de episódios com os filtros vazios
   */
  ngOnInit(): void {
    this.episodios$ = this.service.getFilter('');
    this.episodios$.subscribe(resp => {
      this.setTotalRecords.emit(resp.info.count);
    })
  }

  /**
   * @param id identificador do episódio
   * @description navega até a pagina view episodio
   */
  goto(id: number): void {
    this.router.navigate([`/view/episodio/${id}`]);
  }

  /**
   * @description esse metodo é usado no home.component.ts via viewChild para atualizar a lista de episódios
   * @param queryParams parametros do filtro
   * @returns retorna o observable com os episódios (na pratica essa informação é usada para a paginação)
   */
  filtrar(queryParams: string): Observable<IDataPayload<Iepisodio>> {
    this.episodios$ = this.service.getFilter(queryParams);
    return this.episodios$;
  }
}
