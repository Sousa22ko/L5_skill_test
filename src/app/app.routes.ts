import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ViewPersonagemComponent } from './component/view-personagem/view-personagem.component';
import { ViewLocalComponent } from './component/view-local/view-local.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'personagem/:id', component: ViewPersonagemComponent},
    {path: 'local/:id', component: ViewLocalComponent}
];
