import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Iepisodio } from '@models/Iepisodio.model';

import { SepisodioService } from '@services/sepisodio.service';

import { CommomComponentModule } from '@modules/commomComponent.module';

@Component({
  selector: 'app-view-episodio',
  standalone: true,
  imports: [ CommomComponentModule ],
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
