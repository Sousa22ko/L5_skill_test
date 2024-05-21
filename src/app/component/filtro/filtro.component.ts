import { Component, input, output } from '@angular/core';
import { IeventFilter } from '@models/IeventFilter.model';
import { AdvancedComponentModule } from '@modules/advancedComponent.module';

/**
 * Componente de filtro
 * @description Este componente é o filtro utilizado na aba de personagens, locais e episódios presente na home.component
 * @example
 * <app-filtros></app-filtros>
 */
@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [ AdvancedComponentModule ],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss'
})
export class FiltroComponent {

  /**
   * @param activeIndex representa qual aba está aberta. esse dado é enviado via input da home
   * @param pesquisar output que envia informação sobre o filtro para a home.component, que por sua vez envia para um dos componentes filhos
   */
  activeIndex = input(0);
  pesquisar = output<IeventFilter>();

  // --------------- campos de personagem ----------------
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

  // --------------- campos de locais ----------------

  nome2Filtro: string = '';
  type2Filtro: string = '';
  dimensionFiltro: string = '';

  // --------------- campos de episodios ----------------

  nome3Filtro: string = '';
  episodeFiltro: string = '';

  //------------------------------------------------------

  /**
   * 
   * @description limpa o filtro atual e automaticamente reseta a lista para o padrão, os outros campos de filtro não são limpos
   */
  limparFiltros() {
    if(this.activeIndex() == 1) {
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
      this.pesquisar.emit({pagina: 1});

    }
    else if(this.activeIndex() == 2) {
      let reset = (this.nome2Filtro.length > 0) || (this.type2Filtro.length > 0) || (this.dimensionFiltro.length > 0) 
      if (!reset)  // caso não haja nenhum campo do filtro para limpar
        return;

      //reseta os campos
      this.nome2Filtro = '';
      this.type2Filtro = '';
      this.dimensionFiltro = '';

      //reseta a consulta para o padrão
      this.pesquisar.emit({pagina: 2});

    }
    else if(this.activeIndex() == 3) {
      let reset = (this.nome3Filtro.length > 0) || (this.episodeFiltro.length > 0)
      if (!reset)  // caso não haja nenhum campo do filtro para limpar
        return;
  
      //reseta os campos
      this.nome3Filtro = '';
      this.episodeFiltro = '';
  
      //reseta a consulta para o padrão
      this.pesquisar.emit({pagina: 3});
    }
  }

  /**
   * @description esse metodo prepara a query param e emite o evento que chama o pesquisar da home.component.ts
   */
  filtrar() {
    if(this.activeIndex() == 1){
      let queryParams = '';
      queryParams += this.nomeFiltro.length > 0 ?  `name=${this.nomeFiltro}&` : ""
      queryParams += this.typeFiltro.length > 0 ?  `type=${this.typeFiltro}&` : ""
      queryParams += this.specieFiltro.length > 0 ?  `species=${this.specieFiltro}&` : ""
      queryParams += this.genderFiltro ? `gender=${this.genderFiltro.code}&` : ""
      queryParams += this.statusFiltro ? `status=${this.statusFiltro.code}&` : ""

      // verifica se existe algum filtro, caso contrário não faz nada
      // o campo pagina do filtro representa qual aba o usuario está, logo 1 corresponde a personagem
      if(queryParams.length > 0){ 
        this.pesquisar.emit({pagina: 1, filtro: queryParams})
      }
    } 
    else if (this.activeIndex() == 2) {
      let queryParams = '';
      queryParams += this.nome2Filtro.length > 0 ?  `name=${this.nome2Filtro}&` : ""
      queryParams += this.type2Filtro.length > 0 ?  `type=${this.type2Filtro}&` : ""
      queryParams += this.dimensionFiltro.length > 0 ?  `dimension=${this.dimensionFiltro}&` : ""
  
      // verifica se existe algum filtro, caso contrário não faz nada
      // o campo pagina do filtro representa qual aba o usuario está, logo 2 corresponde a lugar
      if(queryParams.length > 0){ 
        this.pesquisar.emit({pagina: 2, filtro: queryParams})
      }      
    }
    else if (this.activeIndex() == 3) {
      let queryParams = '';
      queryParams += this.nome3Filtro.length > 0 ?  `name=${this.nome3Filtro}&` : ""
      queryParams += this.episodeFiltro.length > 0 ?  `episode=${this.episodeFiltro}&` : ""
  
      // verifica se existe algum filtro, caso contrário não faz nada
      // o campo pagina do filtro representa qual aba o usuario está, logo 3 corresponde a episodio
      if(queryParams.length > 0){ 
        this.pesquisar.emit({pagina: 3, filtro: queryParams})
      }
    }
  }
}
