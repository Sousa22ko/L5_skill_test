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

  activeIndex: number = 0;
  filtroAtual: IeventFilter | undefined;
  totalRecords: number = 0;
  totalRecordsPersonagem: number = 0;
  totalRecordsLocais: number = 0;
  totalRecordsEpisodios: number = 0;

  @ViewChild(PersonagemComponent) personagem?: PersonagemComponent;
  @ViewChild(LocaisComponent) local?: LocaisComponent;
  @ViewChild(EpisodiosComponent) episodio?: EpisodiosComponent;

  pesquisar(event: IeventFilter): void {
    this.filtroAtual = event
    if(event.pagina == 1) {
      this.personagem?.filtrar(event.filtro ? event.filtro : '');
    }
    else if(event.pagina == 2) {
      this.local?.filtrar(event.filtro ? event.filtro : '');
    }
    else if(event.pagina == 3) {
      this.episodio?.filtrar(event.filtro ? event.filtro : '');
    }
  }

  changeTab(event: any) {
    if(event.index == 1) {
      this.filtroAtual = {pagina: 1};
      this.onPageChange({page: 1});
    }
    else if(event.index == 2) {
      this.filtroAtual = {pagina: 2};
      this.onPageChange({page: 1});
    }
    else if(event.index == 3) {
      this.filtroAtual = {pagina: 3};
      this.onPageChange({page: 1});
    }
  }
  
  setTotalRecords(qtd: number): void {
    this.totalRecords = qtd;
  } 

  onPageChange(event: any): void {
    let queryParam = `page=${event.page+1}&${this.filtroAtual?.filtro}`;    
    
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
