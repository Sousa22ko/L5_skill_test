import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IDataPayload } from '../../../model/IdataPayload.model';
import { Ilocalizacao } from '../../../model/Ilocalizacao.model';
import { SlocalizacaoService } from '../../../services/slocalizacao.service';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-locais',
  standalone: true,
  imports: [ 
    CardModule, 
    ButtonModule, 
    CommonModule,
    AccordionModule,
    InputTextModule,
    FormsModule
  ],
  templateUrl: './locais.component.html',
  styleUrl: './locais.component.scss'
})
export class LocaisComponent {

  locais$: Observable<IDataPayload<Ilocalizacao>>;
  pagina: number = 0;

  nomeFiltro: string = '';
  typeFiltro: string = '';
  dimensionFiltro: string = '';
  activeIndex: any = undefined;

  

  constructor(private service: SlocalizacaoService, private router: Router) {
    this.locais$ = this.service.getLocais(this.pagina);
  }

  // vai para a pagina de detalhes do local
  goto(id: number): void {
    this.router.navigate([`/local/${id}`]);
  }

  limparFiltros(): void {
    let reset = (this.nomeFiltro.length > 0) || (this.typeFiltro.length > 0) || (this.dimensionFiltro.length > 0) 
    if (!reset)  // caso não haja nenhum campo do filtro para limpar
      return;

    //reseta os campos
    this.nomeFiltro = '';
    this.typeFiltro = '';
    this.dimensionFiltro = '';

    //reseta a consulta para o padrão
    this.locais$ = this.service.getLocais(this.pagina);
    //reabre a aba de filtro pois os campos atualizados fecham o filtro
    this.activeIndex = 0;
  }

  filtrar(): void {
    let queryParams = '';
    queryParams += this.nomeFiltro.length > 0 ?  `name=${this.nomeFiltro}&` : ""
    queryParams += this.typeFiltro.length > 0 ?  `type=${this.typeFiltro}&` : ""
    queryParams += this.dimensionFiltro.length > 0 ?  `dimension=${this.dimensionFiltro}&` : ""

    if(queryParams.length > 0){ // verifica se existe algum filtro
      this.locais$ = this.service.getFilter(queryParams);
      this.activeIndex = 0;
    }
  }
}
