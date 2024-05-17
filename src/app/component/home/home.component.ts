import { Component, ViewChild } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';

import { PersonagemComponent } from './personagem/personagem.component';
import { LocaisComponent } from './locais/locais.component';
import { EpisodiosComponent } from './episodios/episodios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FiltroComponent } from '@components/filtro/filtro.component';
import { IeventFilter } from '@models/IeventFilter.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ 
    PanelModule, 
    TabViewModule, 
    DashboardComponent,
    PersonagemComponent,
    LocaisComponent,
    EpisodiosComponent,
    FiltroComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  activeIndex: number = 0;

  @ViewChild(PersonagemComponent) personagem!: PersonagemComponent;
  @ViewChild(LocaisComponent) local!: LocaisComponent;
  @ViewChild(EpisodiosComponent) episodio!: EpisodiosComponent;

  pesquisar(event: IeventFilter): void {
    console.log("evento recebido", event)
    if(event.pagina == 1) {
      this.personagem.filtrar(event.filtro ? event.filtro : '');
    }
    else if(event.pagina == 2) {
      this.local.filtrar(event.filtro ? event.filtro : '');
    }
    else if(event.pagina == 3) {
      this.episodio.filtrar(event.filtro ? event.filtro : '');
    }
  }
}
