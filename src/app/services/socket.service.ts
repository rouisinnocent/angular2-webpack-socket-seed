import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
    constructor() {
        this.socket = io();
        this.socket.on('server-init', (msg: string) => {
            console.log('[SOCKET-CLIENT]', msg);
        });
    }
    private socket: SocketIOClient.Socket;
    emit(ev: string, msg: any) {
        this.socket.emit(ev, msg);
    }
    on(ev: string, fn: Function) {
        this.socket.on(ev, fn);
    }
}