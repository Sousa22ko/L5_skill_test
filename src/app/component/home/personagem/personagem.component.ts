import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

import { RAMServiceService } from '../../../service/ramservice.service';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IDataPayloadPersonagem } from '../../../model/IdataPayloadPersonagem.model';
import { SpersonagemService } from '../../../services/spersonagem.service';
import { IDataPayload } from '../../../model/IdataPayload.model';
import { Ipersonagem } from '../../../model/Ipersonagem.model';


@Component({
  selector: 'app-personagem',
  standalone: true,
  imports: [ CommonModule, ButtonModule, CardModule, RouterModule ],
  templateUrl: './personagem.component.html',
  styleUrl: './personagem.component.scss'
})
export class PersonagemComponent {

  personagens$: Observable<IDataPayload<Ipersonagem>>;
  pagina: number = 0;

  constructor(private service: SpersonagemService, private router: Router) {
    this.pagina = 0; 
    this.personagens$ = this.service.getPersonagens(this.pagina);
  }

  // vai para a pagina de detalhes do personagem
  goto(id: number): void {
    this.router.navigate([`/personagem/${id}`]);
  }

}
