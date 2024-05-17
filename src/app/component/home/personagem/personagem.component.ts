import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';

import { SpersonagemService } from '@services/spersonagem.service';

import { IDataPayload } from '@models/IdataPayload.model';
import { Ipersonagem } from '@models/Ipersonagem.model';

import { AdvancedComponentModule } from '@modules/advancedComponent.module';


@Component({
  selector: 'app-personagem',
  standalone: true,
  imports: [ 
    AdvancedComponentModule,
    DropdownModule,
  ],
  templateUrl: './personagem.component.html',
  styleUrl: './personagem.component.scss'
})
export class PersonagemComponent{

  personagens$: Observable<IDataPayload<Ipersonagem>>;
  pagina: number = 1;
  first: number = 0;

  nomeFiltro: string = '';
  specieFiltro: string = '';
  typeFiltro: string = '';
  status: any = [
    {name: 'alive', code: 'alive'},
    {name: 'dead', code: 'dead'},
    {name: 'unknown', code: 'unknown'}
  ];
  statusFiltro: any;
  gender: any = [
    {name: 'Male', code: 'Male'},
    {name: 'Female', code: 'Female'},
    {name: 'Genderless', code: 'Genderless'},
    {name: 'Unknown', code: 'Unknown'},
  ]
  genderFiltro: any;
  activeIndex: any = undefined;

  constructor(private service: SpersonagemService, private router: Router) {
    this.pagina = 0; 
    this.personagens$ = this.service.getPersonagens(this.pagina);
  }


  // vai para a pagina de detalhes do personagem
  goto(id: number): void {
    this.router.navigate([`/personagem/${id}`]);
  }

  limparFiltros(): void {
    let reset = (this.nomeFiltro.length > 0) || (this.typeFiltro.length > 0) || (this.specieFiltro.length > 0) || !!this.genderFiltro || !!this.statusFiltro
    if (!reset)  // caso não haja nenhum campo do filtro para limpar
      return;

    //reseta os campos
    this.nomeFiltro = '';
    this.typeFiltro = '';
    this.genderFiltro = null;
    this.statusFiltro = null;
    this.specieFiltro = '';

    //reseta a consulta para o padrão
    this.personagens$ = this.service.getPersonagens(this.pagina);
    //reabre a aba de filtro pois os campos atualizados fecham o filtro
    this.activeIndex = 0;
  }

  filtrar(queryParams: string): void {
    console.log("filtrando personagem")
    this.personagens$ = this.service.getFilter(queryParams);
  }


  onPageChange(event: any): void {
    this.first = event.first;
    this.personagens$ = this.service.getPersonagens(event.page+1);
  }
}
