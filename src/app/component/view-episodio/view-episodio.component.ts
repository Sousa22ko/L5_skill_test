import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Observable } from 'rxjs';
import { Iepisodio } from '../../model/Iepisoido.model';
import { ActivatedRoute } from '@angular/router';
import { SepisodioService } from '../../services/sepisodio.service';

@Component({
  selector: 'app-view-episodio',
  standalone: true,
  imports: [ CommonModule, CardModule, ButtonModule ],
  templateUrl: './view-episodio.component.html',
  styleUrl: './view-episodio.component.scss'
})
export class ViewEpisodioComponent {

  id: number = 0;
  episodio$: Observable<Iepisodio>;
  
  constructor(private service: SepisodioService, private router: ActivatedRoute) {
    this.router.params.subscribe(res => {
      this.id = res['id'];
    })
    this.episodio$ = this.service.getEpisodio(this.id);
  }
}
