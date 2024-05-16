import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Observable, map } from 'rxjs';
import { RAMServiceService } from '../../../service/ramservice.service';
import { IDataPayloadPersonagem } from '../../../model/IdataPayloadPersonagem.model';
import { CommonModule } from '@angular/common';
import { IdataPayloadLocalizacao } from '../../../model/IdataPayloadLocalizacao.model';
import { IDataPayloadEpisodio } from '../../../model/IdataPayloadEpisodio.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CommonModule, CardModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  personagens$: Observable<IDataPayloadPersonagem>;
  locais$: Observable<IdataPayloadLocalizacao>;
  episodios$: Observable<IDataPayloadEpisodio>;

  male = 0;
  female = 0;
  genderless = 0;
  unknown = 0;

  constructor(private service: RAMServiceService) {
    this.personagens$ = this.service.getPersonagens(0);
    this.locais$ = this.service.getLocais(0);
    this.episodios$ = this.service.getEpisodios(0);

    this.processGender();
  }

  processGender(): void {
    this.personagens$.pipe(map(aux => aux.results.forEach(pers => {
      console.log(pers)
      if(pers.gender == "Male")
        this.male += 1;
      else if(pers.gender == "Female")
        this.female += 1;
      else if(pers.gender == "Genderless")
        this.genderless +=1;
      else 
      this.unknown += 1;
    })));
  }

}
