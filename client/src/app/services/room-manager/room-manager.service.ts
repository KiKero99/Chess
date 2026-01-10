import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoomManagerService {
  private roomId: string = '';

  get id() {
    return this.roomId;
  }

  setRoom(roomId: string) {
    this.roomId = roomId;
  }

  roomExists(): boolean {
    return this.roomId !== '';
  }

  clean() {
    this.roomId = '';
  }
}
