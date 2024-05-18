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

  openAccordion: number | null = null;
  activeIndex: number = 0;
  filtroAtual: IeventFilter | undefined;
  totalRecords: number = 0;
  errorCode: number = 0;

  @ViewChild(PersonagemComponent) personagem?: PersonagemComponent;
  @ViewChild(LocaisComponent) local?: LocaisComponent;
  @ViewChild(EpisodiosComponent) episodio?: EpisodiosComponent;

  //realiza a pesquisa com o filtro
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
  
  setTotalRecords(qtd: number): void {
    this.totalRecords = qtd;
  } 

  //processa a paginação de todas as telas
  onPageChange(event: any): void {
    // por algum motivo desconhecido pela mente humana a api começa na pagina 1 então por isso é somado 1 na pagina
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
