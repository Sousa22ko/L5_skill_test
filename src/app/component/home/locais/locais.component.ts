import { Component, OnInit, output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';

import { IDataPayload } from '@models/IdataPayload.model';
import { Ilocalizacao } from '@models/Ilocalizacao.model';

import { SlocalizacaoService } from '@services/slocalizacao.service';

import { CommomComponentModule } from '@modules/commomComponent.module';


@Component({
  selector: 'app-locais',
  standalone: true,
  imports: [ 
    CommomComponentModule,
  ],
  templateUrl: './locais.component.html',
  styleUrl: './locais.component.scss'
})
export class LocaisComponent implements OnInit{

  locais$!: Observable<IDataPayload<Ilocalizacao>>;
  setTotalRecords = output<number>();  

  constructor(private service: SlocalizacaoService, private router: Router) {
  }
  
  ngOnInit(): void {
    this.locais$ = this.service.getFilter('');
    this.locais$.subscribe(resp => {
      this.setTotalRecords.emit(resp.info.count);
    })
  }

  // vai para a pagina de detalhes do local
  goto(id: number): void {
    this.router.navigate([`/view/local/${id}`]);
  }

  filtrar(queryParams: string): Observable<IDataPayload<Ilocalizacao>> {
    this.locais$ = this.service.getFilter(queryParams);
    return this.locais$;
  }
}
