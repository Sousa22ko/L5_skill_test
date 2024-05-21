import { Component, OnInit, output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';

import { IDataPayload } from '@models/IdataPayload.model';
import { Ilocalizacao } from '@models/Ilocalizacao.model';

import { SlocalizacaoService } from '@services/slocalizacao.service';

import { CommomComponentModule } from '@modules/commomComponent.module';


/**
 * Componente de locais
 * @description Este é o componente da listagem de locais que aparece na home na penultima aba
 * @example
 * <app-locais></app-locais>
 */
@Component({
  selector: 'app-locais',
  standalone: true,
  imports: [ 
    CommomComponentModule,
  ],
  templateUrl: './locais.component.html',
  styleUrl: './locais.component.scss'
})
export class LocaisComponent implements OnInit{

  /**
   * @param locais$$ observable que representa os dados do locais
   * @param setTotalRecords output que envia para o componente pai (home) a quantidade de locais. informação usada para paginação
   */
  locais$!: Observable<IDataPayload<Ilocalizacao>>;
  setTotalRecords = output<number>();  

  constructor(private service: SlocalizacaoService, private router: Router) {
  }
  
  /**
   * @description inicializa a pesquisa de locais com os filtros vazios
   */
  ngOnInit(): void {
    this.locais$ = this.service.getFilter('');
    this.locais$.subscribe(resp => {
      this.setTotalRecords.emit(resp.info.count);
    })
  }
  /**
   * @param id identificador do local
   * @description navega até a pagina view local
   */
  goto(id: number): void {
    this.router.navigate([`/view/local/${id}`]);
  }

  /**
   * @description esse metodo é usado no home.component.ts via viewChild para atualizar a lista de locais
   * @param queryParams parametros do filtro
   * @returns retorna o observable com os locais (na pratica essa informação é usada para a paginação)
   */
  filtrar(queryParams: string): Observable<IDataPayload<Ilocalizacao>> {
    this.locais$ = this.service.getFilter(queryParams);
    return this.locais$;
  }
}
