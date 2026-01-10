import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page.component/main-page.component';
import { GameComponent } from './pages/game.component/game.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent, title: 'Home' },
    { path: 'lobby', component: GameComponent, title: 'WaitingRoom' }
];
