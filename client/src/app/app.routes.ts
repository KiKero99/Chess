import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page.component/main-page.component';
import { WaitingRoomComponent } from './pages/waiting-room.component/waiting-room.component';
import { GameComponent } from './pages/game.component/game.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent, title: 'Home' },
    { path: 'lobby', component: WaitingRoomComponent, title: 'WaitingRoom' },
    { path: 'game', component: GameComponent, title: 'Game' }
];
