import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Ilocalizacao } from '../../model/Ilocalizacao.model';
import { SlocalizacaoService } from '../../services/slocalizacao.service';
import { CommomComponentModule } from '../modules/commomComponent.module';

@Component({
  selector: 'app-view-local',
  standalone: true,
  imports: [ CommomComponentModule ],
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
