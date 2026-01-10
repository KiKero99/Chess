import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page.component/main-page.component';
import { WaitingRoomComponent } from './pages/waiting-room.component/waiting-room.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent, title: 'Home' },
    { path: 'lobby', component: WaitingRoomComponent, title: 'WaitingRoom' }
];
