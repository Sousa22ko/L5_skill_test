import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IDataPayload } from '../../../model/IdataPayload.model';
import { RAMServiceService } from '../../../service/ramservice.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locais',
  standalone: true,
  imports: [ CardModule, ButtonModule, CommonModule ],
  templateUrl: './locais.component.html',
  styleUrl: './locais.component.scss'
})
export class LocaisComponent {

  locais$: Observable<IDataPayload>;
  pagina: number = 0;

  constructor(private service: RAMServiceService, private router: Router) {
    this.locais$ = this.service.getLocais(this.pagina);
  }

  // vai para a pagina de detalhes do local
  goto(id: number): void {
    this.router.navigate([`/local/${id}`]);
  }
}
