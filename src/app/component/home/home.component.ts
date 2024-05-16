import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { PersonagemComponent } from './personagem/personagem.component';
import { LocaisComponent } from './locais/locais.component';
import { EpisodiosComponent } from './episodios/episodios.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ 
    PanelModule, 
    TabViewModule, 
    DashboardComponent,
    PersonagemComponent,
    LocaisComponent,
    EpisodiosComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


}
