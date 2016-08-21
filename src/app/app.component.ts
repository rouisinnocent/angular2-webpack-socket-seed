import { Component } from '@angular/core';
import { SocketService } from './services/socket.service';


@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: [
        './app.component.css'
    ]
})

export class AppComponent {
    constructor(
        private socketService: SocketService
    ) {
        socketService.emit('app-component-connect','im app component connected');
    }
}