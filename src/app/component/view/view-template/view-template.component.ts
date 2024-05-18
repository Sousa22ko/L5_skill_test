import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-view-template',
  standalone: true,
  imports: [CardModule],
  templateUrl: './view-template.component.html',
  styleUrl: './view-template.component.scss'
})
export class ViewTemplateComponent {

}
