import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

import { RAMServiceService } from '../../../service/ramservice.service';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IDataPayload } from '../../../model/IdataPayload.model';


@Component({
  selector: 'app-personagem',
  standalone: true,
  imports: [ CommonModule, ButtonModule, CardModule ],
  templateUrl: './personagem.component.html',
  styleUrl: './personagem.component.scss'
})
export class PersonagemComponent {

  personagens$: Observable<IDataPayload>;
  pagina: number = 0;

  constructor(private service: RAMServiceService) {
    this.pagina = 0; 
    this.personagens$ = this.service.getPersonagens(this.pagina);
  }

}
