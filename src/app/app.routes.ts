import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ViewComponent } from '@components/view/view.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'view/:tipo/:id', component: ViewComponent},
];
