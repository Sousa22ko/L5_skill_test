import { Component, OnInit, output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SpersonagemService } from '@services/spersonagem.service';

import { IDataPayload } from '@models/IdataPayload.model';
import { Ipersonagem } from '@models/Ipersonagem.model';

import { CommomComponentModule } from '@modules/commomComponent.module';


@Component({
  selector: 'app-personagem',
  standalone: true,
  imports: [ 
    CommomComponentModule,
  ],
  templateUrl: './personagem.component.html',
  styleUrl: './personagem.component.scss'
})
export class PersonagemComponent implements OnInit{

  personagens$!: Observable<IDataPayload<Ipersonagem>>;
  setTotalRecords = output<number>();

  constructor(private service: SpersonagemService, private router: Router) {
  }
  
  ngOnInit(): void {
    this.personagens$ = this.service.getFilter('');
    this.personagens$.subscribe(resp => {
      this.setTotalRecords.emit(resp.info.count);
    });
  }

  // vai para a pagina de detalhes do personagem
  goto(id: number): void {
    this.router.navigate([`/view/personagem/${id}`]);
  }

  filtrar(queryParams: string): Observable<IDataPayload<Ipersonagem>> {
    this.personagens$ = this.service.getFilter(queryParams);
    return this.personagens$;
  }
}
