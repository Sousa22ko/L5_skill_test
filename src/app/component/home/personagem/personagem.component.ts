import { Component, OnInit, output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SpersonagemService } from '@services/spersonagem.service';

import { IDataPayload } from '@models/IdataPayload.model';
import { Ipersonagem } from '@models/Ipersonagem.model';

import { CommomComponentModule } from '@modules/commomComponent.module';

/**
 * Componente de personagem
 * @description Este é o componente da listagem de personagens que aparece na home na segunda aba
 * @example
 * <app-personagem></app-personagem>
 */
@Component({
  selector: 'app-personagem',
  standalone: true,
  imports: [ 
    CommomComponentModule,
  ],
  templateUrl: './personagem.component.html',
  styleUrl: './personagem.component.scss'
})
export class PersonagemComponent implements OnInit{

  /**
   * @param personagens$ observable que representa os dados dos personagens
   * @param setTotalRecords output que envia para o componente pai (home) a quantidade de personagens. informação usada para paginação
   */
  personagens$!: Observable<IDataPayload<Ipersonagem>>;
  setTotalRecords = output<number>();

  constructor(private service: SpersonagemService, private router: Router) {
  }
  
  /**
   * @description inicializa a pesquisa de personagens com os filtros vazios
   */
  ngOnInit(): void {
    this.personagens$ = this.service.getFilter('');
    this.personagens$.subscribe(resp => {
      this.setTotalRecords.emit(resp.info.count);
    });
  }

  /**
   * @param id identificador do personagem
   * @description navega até a pagina view local
   */
  goto(id: number): void {
    this.router.navigate([`/view/personagem/${id}`]);
  }

  /**
   * @description esse metodo é usado no home.component.ts via viewChild para atualizar a lista de personagens
   * @param queryParams parametros do filtro
   * @returns retorna o observable com os personagens (na pratica essa informação é usada para a paginação)
   */
  filtrar(queryParams: string): Observable<IDataPayload<Ipersonagem>> {
    this.personagens$ = this.service.getFilter(queryParams);
    return this.personagens$;
  }
}
