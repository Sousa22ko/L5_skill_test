import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Observable, forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { SpersonagemService } from '../../../services/spersonagem.service';
import { IDataPayload } from '../../../model/IdataPayload.model';
import { Ipersonagem } from '../../../model/Ipersonagem.model';
import { SlocalizacaoService } from '../../../services/slocalizacao.service';
import { Ilocalizacao } from '../../../model/Ilocalizacao.model';
import { Iepisodio } from '../../../model/Iepisoido.model';
import { SepisodioService } from '../../../services/sepisodio.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CommonModule, CardModule, ChartModule, ButtonModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  
  personagens$: Observable<IDataPayload<Ipersonagem>>;
  locais$: Observable<IDataPayload<Ilocalizacao>>;
  episodios$: Observable<IDataPayload<Iepisodio>>;
  pageEpisodes: number = 1; // aparentemente a lista deles começa com 1
  qtdPlanetas$: Observable<IDataPayload<Ilocalizacao>>;
  
  datachart: any; // grafico de barras
  data: any; // grafico donnut

  options = {
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


  constructor(private personagemS: SpersonagemService, private localizacaoS: SlocalizacaoService, private episodioS: SepisodioService) {
    this.personagens$ = this.personagemS.getPersonagens(0);
    this.locais$ = this.localizacaoS.getLocais(0);
    this.episodios$ = this.episodioS.getEpisodios(this.pageEpisodes);
    this.qtdPlanetas$ = this.localizacaoS.getPlanetas();

    this.processData();
    this.processDataChart();
  }

  processDataChart(): void{

    let listEpisodes: string[] = [];
    let listPersEpisodes: number[] = [];
    this.episodios$.subscribe(resp => {
      resp.results.forEach(ep => {
        listEpisodes.push(ep.episode);
        listPersEpisodes.push(ep.characters.length);
      });
    
      this.datachart = {
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

  changePageEpisode(op: string): void {
    if(op !== 'up' && op !== 'dw') {
      return;
    } else if(op == 'up') {
      this.pageEpisodes += 1;
    } else if (op == 'dw') {
      this.pageEpisodes -= 1;
    }

    this.episodios$ = this.episodioS.getEpisodios(this.pageEpisodes);
    this.processDataChart();

  }

  //espera as 4 requisições de genero receberem as respostas antes de retornar pro processData
  customForkJoin (): Observable<any[]> {
    const males = this.personagemS.getGender("Male");
    const females = this.personagemS.getGender("Female");
    const genderless = this.personagemS.getGender("Genderless");
    const unknown = this.personagemS.getGender("Unknown");
    return forkJoin([males, females, genderless, unknown]);
  }

  processData() {
    let values: number [] = []

    // A API do Rick and Morty não possui no modelo rest uma forma de listar eficientemente os generos, então vou ter que filtrar
    // os 4 separadamente
    this.customForkJoin().subscribe(resp => {
      values.push(resp[0].info.count); // quantidade males
      values.push(resp[1].info.count); // quantidade females
      values.push(resp[2].info.count); // quantidade genderless
      values.push(resp[3].info.count); // quantidade unknown

      this.data = {
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

}
