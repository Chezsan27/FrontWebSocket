import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

  constructor(private socket: Socket) { }
  emitUser(user: any): void {
    this.socket.emit('add-user', user);
  }

  emitExit(): void {
    this.socket.emit('exit');
  }

  getClientId(): Observable<any> {
    return this.socket.fromEvent('user-id');
  }

  getUsersOnline(): Observable<any[]> {
    return this.socket.fromEvent<any[]>('users-online');
  }

  getNews() {
    return this.socket.fromEvent<any>('news');
  }
}
