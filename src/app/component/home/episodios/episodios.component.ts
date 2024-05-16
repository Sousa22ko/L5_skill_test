import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Observable } from 'rxjs';
import { RAMServiceService } from '../../../service/ramservice.service';
import { Router } from '@angular/router';
import { IDataPayloadEpisodio } from '../../../model/IdataPayloadEpisodio.model';

@Component({
  selector: 'app-episodios',
  standalone: true,
  imports: [ CardModule, ButtonModule, CommonModule ],
  templateUrl: './episodios.component.html',
  styleUrl: './episodios.component.scss'
})
export class EpisodiosComponent {

  episodios$: Observable<IDataPayloadEpisodio>;
  pagina: number = 0;

  constructor(private service: RAMServiceService, private router: Router) {
    this.episodios$ = this.service.getEpisodios(this.pagina);
  }

  // vai para a pagina de detalhes do local
  goto(id: number): void {
    this.router.navigate([`/local/${id}`]);
  }
}