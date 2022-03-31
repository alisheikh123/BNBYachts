import { HubConnection, HubConnectionBuilder} from '@microsoft/signalr';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../host/notification.service';

@Injectable({
    providedIn: 'root'
})

export class SignalRAspNetCoreHelper {
    constructor(private toastr: ToastrService,
        private notificationService: NotificationService) {

    }
    private _hubConnection!: HubConnection;
    initSignalR(): void {
        this.createConnection();
        this.startConnection();
    }

    private showMessage(message: any) {
        this.toastr.success(message, "Notification Recived", {
            timeOut: 3000,
            positionClass: 'toast-bottom-left',
        })
    }

    private createConnection() {
        this._hubConnection = new HubConnectionBuilder()
            .withUrl(environment.NOTIFICATION_APP_URL + "signalr-hubs/Notification")
            .build();
    }

    private startConnection() {
        this._hubConnection
            .start()
            .then(() => {
               
                this._hubConnection.invoke('GetConnectionId').then((connectionId) => {
                    console.log(connectionId)
                });
            })
            .catch((err) => console.log("Error while establishing a connection :( "));;

        /////Calls when message is broadcast to the reciever...
        this._hubConnection.on('NotifyClient', (message) => { // Register for incoming messages
            this.showMessage(message)
            this.notificationService.addNotification("1");
        })

    }


}
