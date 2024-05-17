import { Component, OnInit, output } from '@angular/core';
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
export class EpisodiosComponent implements OnInit {

  episodios$!: Observable<IDataPayload<Iepisodio>>;
  setTotalRecords = output<number>();

  constructor(private service: SepisodioService, private router: Router) {
  }
  
  ngOnInit(): void {
    this.episodios$ = this.service.getEpisodios(1);
    this.episodios$.subscribe(resp => {
      this.setTotalRecords.emit(resp.info.count)
    })
  }

  // vai para a pagina de detalhes do local
  goto(id: number): void {
    this.router.navigate([`/episodio/${id}`]);
  }

  filtrar(queryParams: string): Observable<IDataPayload<Iepisodio>> {
    this.episodios$ = this.service.getFilter(queryParams);
    return this.episodios$;
  }
}
