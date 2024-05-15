import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ViewPersonagemComponent } from './component/view-personagem/view-personagem.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'personagem/:id', component: ViewPersonagemComponent}
];
