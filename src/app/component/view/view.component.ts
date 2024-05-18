import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommomComponentModule } from '@modules/commomComponent.module';
import { SepisodioService } from '@services/sepisodio.service';
import { SlocalizacaoService } from '@services/slocalizacao.service';
import { SpersonagemService } from '@services/spersonagem.service';
import { Observable, of } from 'rxjs';
import { ViewTemplateComponent } from './view-template/view-template.component';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommomComponentModule, ViewTemplateComponent],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit{

  id: number = 0;
  tipo: string = '';
  data$!: Observable<any>;
  
  constructor(
    private pService: SpersonagemService,
    private lService: SlocalizacaoService,
    private eService: SepisodioService, 
    private router: ActivatedRoute,
    private redirect: Router) {
  }
    
  ngOnInit(): void {
    this.router.params.subscribe(res => {
      this.tipo = res['tipo'];
      this.id = res['id'];
      
   
      if(this.tipo == 'personagem') {
        this.data$ = this.pService.getPersonagem(this.id);
      } 
      else if (this.tipo == 'local') {
        this.data$ = this.lService.getLocal(this.id);
      }
      else if (this.tipo == 'episodio') {
        this.data$ = this.eService.getEpisodio(this.id);
      }
      else
        this.data$ = of();

        this.data$.subscribe(resp => {
          console.log(resp)
        })
    })
  }

  gotoPlanet(url: string) {
    let parts = url.split('/');
    this.redirect.navigate([`/view/local/${parts[parts.length-1]}`]);
  }
  goHome() {
    this.redirect.navigate([`/home`]);
  }

}
