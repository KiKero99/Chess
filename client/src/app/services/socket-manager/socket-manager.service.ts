import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '@app/../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class SocketManagerService {
  private socket?: Socket;

  get id(): string | undefined{
    return this.socket?.id;
  }

  isSocketAlive() {
    return this.socket?.connected;
  }

  connect() {
    if (this.isSocketAlive()) return;

    this.socket = io(environment.serverUrl, {transports: ['websocket'], upgrade: false})
  }

  disconnect() {
    this.socket?.disconnect();
  }

  on<T>(event: string, action: (data: T) => void) {
    this.socket?.on(event, action);
  }

  off(event: string) {
    this.socket?.off(event);
  }

  clearAllEvents() {
    this.socket?.off();
  }

  send<T>(event: string, data?: T) {
    if(data) {
      this.socket?.emit(event, data);
      return;
    }

    this.socket?.emit(event);
  }
}
