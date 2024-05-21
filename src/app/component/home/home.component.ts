import { Component, ViewChild } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';

import { PersonagemComponent } from './personagem/personagem.component';
import { LocaisComponent } from './locais/locais.component';
import { EpisodiosComponent } from './episodios/episodios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FiltroComponent } from '@components/filtro/filtro.component';
import { IeventFilter } from '@models/IeventFilter.model';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';


/**
 * Componente de home
 * @description Este é o componente é a tela principal do aplicativo
 * @example
 * <app-home></app-home>
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ 
    PanelModule, 
    TabViewModule, 
    CommonModule,
    DashboardComponent,
    PersonagemComponent,
    LocaisComponent,
    EpisodiosComponent,
    FiltroComponent,
    PaginatorModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

/**
 * @param openAccordion representa o estado do filtro (aberto ou fechado) e qual aba está
 * @param activeIndex representa qual aba o usuario está (dashboard, personagem, local ou episodio). também é usado para o filtro
 * @param filtroAtual armazena todos os campos do filtro, de todas as abas
 * @param totalRecords quantidade de itens listados pelos componentes filhos. usado na paginação
 * @param errorCode usado para tratar pesquisa com filtro inválido
 * @param personagem representa o componente filho "personagem". Usado para invocar a pesquisa e filtro
 * @param local representa o componente filho "local". Usado para invocar a pesquisa e filtro
 * @param episodio representa o componente filho "episodio". Usado para invocar a pesquisa e filtro
 */

  openAccordion: number | null = null;
  activeIndex: number = 0;
  filtroAtual: IeventFilter | undefined;
  totalRecords: number = 0;
  errorCode: number = 0;

  @ViewChild(PersonagemComponent) personagem?: PersonagemComponent;
  @ViewChild(LocaisComponent) local?: LocaisComponent;
  @ViewChild(EpisodiosComponent) episodio?: EpisodiosComponent;

  /**
   * @description realiza a pesquisa com o filtro
   * @param event filtro da pesquisa. esse parametro é passado via output do componente filtro.component
   */
  pesquisar(event: IeventFilter): void {
    this.filtroAtual = event
    if(event.pagina == 1) {
      this.personagem?.filtrar(event.filtro ? event.filtro : '').subscribe({
        next: resp => {
          this.errorCode = 200
          this.totalRecords = resp.info.count;
        }, error: (err: any) => { 
          this.errorCode = err.status
          this.totalRecords = 0;
        }
      });
    }
    else if(event.pagina == 2) {
      this.local?.filtrar(event.filtro ? event.filtro : '').subscribe({
        next: resp => {
          this.errorCode = 200
          this.totalRecords = resp.info.count;
        }, error: (err: any) => { 
          this.errorCode = err.status
          this.totalRecords = 0;
        }
      });
    }
    else if(event.pagina == 3) {
      this.episodio?.filtrar(event.filtro ? event.filtro : '').subscribe({
        next: resp => {
          this.errorCode = 200
          this.totalRecords = resp.info.count;
        }, error: (err: any) => { 
          this.errorCode = err.status
          this.totalRecords = 0;
        }
      });
    }
  }

  /**
   * @description altera a aba e o conteudo tanto da listagem quanto do filtro
   * @param event evento de trocar de aba. aponta para qual das 4 abas o usuários esta navegando
   */
  changeTab(event: any) {
    // this.activeIndex = this.activeIndex != 0 ? event.index : 0 
    let filtroTemporario = this.filtroAtual?.filtro;
    if(event.index == 1) {
      this.filtroAtual = {pagina: 1, filtro: filtroTemporario};
      this.onPageChange({page: 0});
    }
    else if(event.index == 2) {
      this.filtroAtual = {pagina: 2, filtro: filtroTemporario};
      this.onPageChange({page: 0});
    }
    else if(event.index == 3) {
      this.filtroAtual = {pagina: 3, filtro: filtroTemporario};
      this.onPageChange({page: 0});
    }
  }
  
  /**
   * 
   * @param qtd resposta do output de cada componente filho com a quantidade de itens que deve ser apresentado na paginação
   */
  setTotalRecords(qtd: number): void {
    this.totalRecords = qtd;
  } 

  /**
   * @description processa a paginação de todas as telas
   * @param event objeto vindo da mudança de pagina
   */
  onPageChange(event: any): void {
    // é somado 1 a pagina porque por algum motivo desconhecido a pagina da api começa no numero 1 e não 0
    let queryParam = `page=${event.page+1}&${this.filtroAtual?.filtro? this.filtroAtual?.filtro : ''}`;    
    
    if(this.filtroAtual?.pagina == 1) {
      this.personagem?.filtrar(queryParam).subscribe(resp => {
        this.totalRecords = resp.info.count;
      });
    }
    else if(this.filtroAtual?.pagina == 2) {
      this.local?.filtrar(queryParam).subscribe(resp => {
        this.totalRecords = resp.info.count;
      });
    }
    else if(this.filtroAtual?.pagina == 3) {
      this.episodio?.filtrar(queryParam).subscribe(resp => {
        this.totalRecords = resp.info.count;
      });
    }
  }
}
