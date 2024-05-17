import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

import { Ipersonagem } from '@models/Ipersonagem.model';

import { SpersonagemService } from '@services/spersonagem.service';

import { CommomComponentModule } from '@modules/commomComponent.module';

@Component({
  selector: 'app-view-personagem',
  standalone: true,
  imports: [ CommomComponentModule ],
  templateUrl: './view-personagem.component.html',
  styleUrl: './view-personagem.component.scss'
})
export class ViewPersonagemComponent {

  id: number = 0;
  personagem$: Observable<Ipersonagem>;
  
  constructor(private service: SpersonagemService, private router: ActivatedRoute, private redirect: Router) {
    this.router.params.subscribe(res => {
      this.id = res['id'];
    })
    this.personagem$ = this.service.getPersonagem(this.id);
  }

  gotoPlanet(url: string) {
    let parts = url.split('/');
    this.redirect.navigate([`/local/${parts[parts.length-1]}`]);
  }
}
