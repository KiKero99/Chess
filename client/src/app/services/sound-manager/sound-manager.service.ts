import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { FXS } from '@app/constants/sound.consts';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SoundManagerService {
  private readonly FXS_MAP: Map<string, HTMLAudioElement> = new Map<string, HTMLAudioElement>();
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.loadFxs();
    }
  }

  private loadFx(key: string, url:string) {
      if (!this.FXS_MAP.has(key)) {
          const audio = new Audio(url);
          this.FXS_MAP.set(key, audio);
      }
  }
  
  loadFxs() {
    for (const audio of FXS)  {
      this.loadFx(audio[0], audio[1]);
    }
  }

  playFx(key: string) {
    const sound = this.FXS_MAP.get(key);
    if (!sound) return;

    const clone = sound.cloneNode() as HTMLAudioElement;
    clone.play();
  }
}
