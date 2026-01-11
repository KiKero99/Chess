import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerService } from './services/player/player.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('client');

  // Initialize before hand
  private readonly playerService: PlayerService = inject(PlayerService);
}
