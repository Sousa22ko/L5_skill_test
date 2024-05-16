import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IDataPayload } from '../../../model/IdataPayload.model';
import { Ilocalizacao } from '../../../model/Ilocalizacao.model';
import { SlocalizacaoService } from '../../../services/slocalizacao.service';

@Component({
  selector: 'app-locais',
  standalone: true,
  imports: [ CardModule, ButtonModule, CommonModule ],
  templateUrl: './locais.component.html',
  styleUrl: './locais.component.scss'
})
export class LocaisComponent {

  locais$: Observable<IDataPayload<Ilocalizacao>>;
  pagina: number = 0;

  constructor(private service: SlocalizacaoService, private router: Router) {
    this.locais$ = this.service.getLocais(this.pagina);
  }

  // vai para a pagina de detalhes do local
  goto(id: number): void {
    this.router.navigate([`/local/${id}`]);
  }
}
