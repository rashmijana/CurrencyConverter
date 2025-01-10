import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'history',component:HistoryComponent},
    { path: '**', redirectTo: '' }
];
