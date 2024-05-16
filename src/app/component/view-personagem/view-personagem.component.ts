import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ipersonagem } from '../../model/Ipersonagem.model';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SpersonagemService } from '../../services/spersonagem.service';

@Component({
  selector: 'app-view-personagem',
  standalone: true,
  imports: [ CommonModule, CardModule, ButtonModule ],
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
