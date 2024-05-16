import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IDataPayload } from '../../../model/IdataPayload.model';
import { Iepisodio } from '../../../model/Iepisoido.model';
import { SepisodioService } from '../../../services/sepisodio.service';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-episodios',
  standalone: true,
  imports: [ 
    CardModule, 
    ButtonModule, 
    CommonModule,
    AccordionModule,
    InputTextModule,
    FormsModule,
    PaginatorModule
  ],
  templateUrl: './episodios.component.html',
  styleUrl: './episodios.component.scss'
})
export class EpisodiosComponent {

  episodios$: Observable<IDataPayload<Iepisodio>>;
  pagina: number = 1;
  first: number = 0;
  activeIndex: any = undefined;
  nomeFiltro: string = '';
  episodeFiltro: string = '';

  constructor(private service: SepisodioService, private router: Router) {
    this.episodios$ = this.service.getEpisodios(this.pagina);
  }

  // vai para a pagina de detalhes do local
  goto(id: number): void {
    this.router.navigate([`/episodio/${id}`]);
  }

  limparFiltros(): void {
    let reset = (this.nomeFiltro.length > 0) || (this.episodeFiltro.length > 0)
    if (!reset)  // caso não haja nenhum campo do filtro para limpar
      return;

    //reseta os campos
    this.nomeFiltro = '';
    this.episodeFiltro = '';

    //reseta a consulta para o padrão
    this.episodios$ = this.service.getEpisodios(this.pagina);
    //reabre a aba de filtro pois os campos atualizados fecham o filtro
    this.activeIndex = 0;
  }

  filtrar(): void {
    let queryParams = '';
    queryParams += this.nomeFiltro.length > 0 ?  `name=${this.nomeFiltro}&` : ""
    queryParams += this.episodeFiltro.length > 0 ?  `episode=${this.episodeFiltro}&` : ""

    if(queryParams.length > 0){ // verifica se existe algum filtro
      this.episodios$ = this.service.getFilter(queryParams);
      this.activeIndex = 0;
    }
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.episodios$ = this.service.getEpisodios(event.page+1);
  }
}
