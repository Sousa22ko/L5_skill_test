import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RAMServiceService } from '../../service/ramservice.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Ilocalizacao } from '../../model/Ilocalizacao.model';
import { SlocalizacaoService } from '../../services/slocalizacao.service';

@Component({
  selector: 'app-view-local',
  standalone: true,
  imports: [ CommonModule, CardModule, ButtonModule ],
  templateUrl: './view-local.component.html',
  styleUrl: './view-local.component.scss'
})
export class ViewLocalComponent {

  id: number = 0;
  local$: Observable<Ilocalizacao>;
  
  constructor(private service: SlocalizacaoService, private router: ActivatedRoute) {
    this.router.params.subscribe(res => {
      this.id = res['id'];
    })
    this.local$ = this.service.getLocal(this.id);
  }

}
