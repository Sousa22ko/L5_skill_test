import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Ilocation } from '../../model/Ilocalizacao.model';
import { RAMServiceService } from '../../service/ramservice.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-view-local',
  standalone: true,
  imports: [ CommonModule, CardModule, ButtonModule ],
  templateUrl: './view-local.component.html',
  styleUrl: './view-local.component.scss'
})
export class ViewLocalComponent {

  id: number = 0;
  local$: Observable<Ilocation>;
  
  constructor(private service: RAMServiceService, private router: ActivatedRoute) {
    this.router.params.subscribe(res => {
      this.id = res['id'];
    })
    this.local$ = this.service.getLocal(this.id);
  }

}
