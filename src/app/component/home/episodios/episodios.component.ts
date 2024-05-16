import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IDataPayload } from '../../../model/IdataPayload.model';
import { Iepisodio } from '../../../model/Iepisoido.model';
import { SepisodioService } from '../../../services/sepisodio.service';

@Component({
  selector: 'app-episodios',
  standalone: true,
  imports: [ CardModule, ButtonModule, CommonModule ],
  templateUrl: './episodios.component.html',
  styleUrl: './episodios.component.scss'
})
export class EpisodiosComponent {

  episodios$: Observable<IDataPayload<Iepisodio>>;
  pagina: number = 0;

  constructor(private service: SepisodioService, private router: Router) {
    this.episodios$ = this.service.getEpisodios(this.pagina);
  }

  // vai para a pagina de detalhes do local
  goto(id: number): void {
    this.router.navigate([`/episodio/${id}`]);
  }
}
