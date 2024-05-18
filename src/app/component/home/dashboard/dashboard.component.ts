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
  
  personagens$!: Observable<IDataPayload<Ipersonagem>>;
  locais$!: Observable<IDataPayload<Ilocalizacao>>;
  episodios$!: Observable<IDataPayload<Iepisodio>>;
  qtdPlanetas$!: Observable<IDataPayload<Ilocalizacao>>;
  
  pageEpisodes: number = 1; // aparentemente a lista deles começa com 1
  
  dataBarras: any; // grafico de barras
  dataDonnut: any; // grafico donnut

  //configurações extras dos graficos
  optionsBarras: any;
  optionsDonnut: any;


  constructor(private personagemS: SpersonagemService, private localizacaoS: SlocalizacaoService, private episodioS: SepisodioService) {
  }
  
  ngOnInit(): void {
    // prepara options
    this.prepareOptionData();


    this.personagens$ = this.personagemS.getFilter('');
    this.locais$ = this.localizacaoS.getFilter('');
    this.episodios$ = this.episodioS.getFilter('');
    this.qtdPlanetas$ = this.localizacaoS.getFilter('type=planet');
  
    this.processDataDonnut();
    this.processDataBarras();
  }

  // prepara o grafico
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

    // prepara o grafico
    processDataDonnut() {
      let values: number [] = []
  
      // A API do Rick and Morty não possui no modelo rest uma forma de listar eficientemente os generos, então vou ter que filtrar
      // os 4 separadamente
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

  //passa a pagina do grafico de barras
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

  //espera as 4 requisições de genero receberem as respostas antes de retornar pro processData
  customForkJoin (): Observable<any[]> {
    const males = this.personagemS.getFilter("gender=Male");
    const females = this.personagemS.getFilter("gender=Female");
    const genderless = this.personagemS.getFilter("gender=Genderless");
    const unknown = this.personagemS.getFilter("gender=Unknown");
    return forkJoin([males, females, genderless, unknown]);
  }

  // carrega os dados de options dos 2 graficos
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
