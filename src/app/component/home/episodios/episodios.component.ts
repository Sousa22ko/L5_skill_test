import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IDataPayload } from '@models/IdataPayload.model';
import { Iepisodio } from '@models/Iepisodio.model';
import { SepisodioService } from '@services/sepisodio.service';
import { CommomComponentModule } from '@modules/commomComponent.module';

@Component({
  selector: 'app-episodios',
  standalone: true,
  imports: [ 
    CommomComponentModule
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

  filtrar(queryParams: string): void {
    this.episodios$ = this.service.getFilter(queryParams);
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.episodios$ = this.service.getEpisodios(event.page+1);
  }
}
