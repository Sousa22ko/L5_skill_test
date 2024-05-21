import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { ChartModule } from 'primeng/chart';

import { SpersonagemService } from '@services/spersonagem.service';
import { SlocalizacaoService } from '@services/slocalizacao.service';
import { SepisodioService } from '@services/sepisodio.service';

import { IDataPayload } from '@models/IdataPayload.model';
import { Ipersonagem } from '@models/Ipersonagem.model';
import { Ilocalizacao } from '@models/Ilocalizacao.model';
import { Iepisodio } from '@models/Iepisodio.model';

import { CommomComponentModule } from '@modules/commomComponent.module';


/**
 * Componente de Dashboard
 * @description Este é o componente da primeira aba da home, onde é exibido os graficos e dados 
 * @example
 * <app-dashboard></app-dashboard>
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ 
    CommomComponentModule,
     
    ChartModule 
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  
  
  /**
   * @param personagem$ observable que representa os dados do personagem
   * @param locais$ observable que representa os dados do locais
   * @param episodios$ observable que representa os dados do episodios
   * @param qtdPlanetas$ observable que representa os dados do locais com filtro de planetas
   * @param pageEpisodios usado para fazer a paginação do gráfico de episodios
   * @param dataBarras dados do grafico de barras
   * @param dataDonnut dados do grafico de donnut
   * @param optionsBarras metadata do grafico de barras
   * @param optionsDonnut metadata do grafico de donnut
   * 
   */

  personagens$!: Observable<IDataPayload<Ipersonagem>>;
  locais$!: Observable<IDataPayload<Ilocalizacao>>;
  episodios$!: Observable<IDataPayload<Iepisodio>>;
  qtdPlanetas$!: Observable<IDataPayload<Ilocalizacao>>;
  
  pageEpisodes: number = 1; // a lista da api começa na pagina 1, então se colocar 0 ele vai passar 2x pela mesma informação
  
  dataBarras: any; 
  dataDonnut: any; 

  optionsBarras: any;
  optionsDonnut: any;


  constructor(private personagemS: SpersonagemService, private localizacaoS: SlocalizacaoService, private episodioS: SepisodioService) {
  }
  
  ngOnInit(): void {
    this.prepareOptionData();

    this.personagens$ = this.personagemS.getFilter('');
    this.locais$ = this.localizacaoS.getFilter('');
    this.episodios$ = this.episodioS.getFilter('');
    this.qtdPlanetas$ = this.localizacaoS.getFilter('type=planet');
  
    this.processDataDonnut();
    this.processDataBarras();
  }

  /**
   * @description prepara o grafico de barras
   */
  processDataBarras(): void{
    let listEpisodes: string[] = [];
    let listPersEpisodes: number[] = [];
    this.episodios$.subscribe(resp => {
      resp.results.forEach(ep => {
        listEpisodes.push(ep.episode); //registra o nome do episódio
        listPersEpisodes.push(ep.characters.length); // registra quantos personagens existem em cada episodio
      });
    
      this.dataBarras = {
        labels: listEpisodes,
        datasets: [
          {
            label: 'Quantidade de personagens por episódio',
            fill: false,
            borderColor: "#9ad052",
            yAxisID: 'y',
            tension: 0.4,
            data: listPersEpisodes
          },
        ]
      };
    });
  }

    /**
     * @description prepara o grafico donnut
     */
    processDataDonnut() {
      let values: number [] = []
  
      // A API do Rick and Morty não possui no modelo rest uma forma de listar eficientemente 
      // os generos, então vou ter que filtrar os 4 separadamente
      this.customForkJoin().subscribe(resp => {
        values.push(resp[0].info.count); // quantidade males
        values.push(resp[1].info.count); // quantidade females
        values.push(resp[2].info.count); // quantidade genderless
        values.push(resp[3].info.count); // quantidade unknown
  
        this.dataDonnut = {
          labels: ['Male', 'Female', 'Genderless', 'Unknown'],
          datasets: [
            {
              data: values,
              backgroundColor: ["#2F8DFF", "#FFC6B1", "#FFFFFF", "#000000"],
              hoverBackgroundColor: ["#2F8DFF", "#FFC6B1", "#FFFFFF", "#000000"]
            }
          ]
        };
      });
    }

  /**
   * @description passa a pagina do grafico de barras
   * cada pagina contem 20 episodios em sequencia
   */
  changePageEpisode(op: string): void {
    if(op !== 'up' && op !== 'dw') {
      return;
    } else if(op == 'up') {
      this.pageEpisodes += 1;
    } else if (op == 'dw') {
      this.pageEpisodes -= 1;
    }

    this.episodios$ = this.episodioS.getFilter(`page=${this.pageEpisodes}`);
    this.processDataBarras();
  }

  /**
   * @description espera as 4 requisições de genero receberem as respostas 
   * @returns um objeto contendo os dados das 4 requisições de genero
   */
  customForkJoin (): Observable<any[]> {
    const males = this.personagemS.getFilter("gender=Male");
    const females = this.personagemS.getFilter("gender=Female");
    const genderless = this.personagemS.getFilter("gender=Genderless");
    const unknown = this.personagemS.getFilter("gender=Unknown");
    return forkJoin([males, females, genderless, unknown]);
  }

  /**
   * @description carrega os dados de options dos 2 graficos
   */
  prepareOptionData(): void {

    this.optionsDonnut =  {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: "#FFF"
          }
        }
      }
    };

    this.optionsBarras = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false
        },
        legend: {
          labels: {
            color: "#FFF"
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: "#fff"
          },
          grid: {
            color: "#fff",
            drawBorder: false
          }
        },
        y: {
          stacked: true,
          ticks: {
            color: "#fff"
          },
          grid: {
            color: "#fff",
            drawBorder: false
          }
        }
      }
    };
  }
}
