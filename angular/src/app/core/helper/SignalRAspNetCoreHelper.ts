import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { time } from 'console';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../host/notification.service';
import * as signalR from '@microsoft/signalr';

@Injectable({
    providedIn: 'root'
})

export class SignalRAspNetCoreHelper {
    constructor(private toastr: ToastrService,
        private notificationService: NotificationService) {

    }
    private _hubConnection!: signalR.HubConnection;
    initSignalR(callback?: () => void): void {
        this.createConnection();
    }


    private showMessage(message:any)
    {
        this.toastr.success(message,"Notification Recived", {
            timeOut: 3000,
            positionClass: 'toast-bottom-left',
          })
    }
    private createConnection() {

        if(localStorage.getItem('userId')?.toString()!==undefined)
        {
        this._hubConnection = new signalR.HubConnectionBuilder()
            .configureLogging(LogLevel.Debug)
            .withUrl(environment.NOTIFICATION_APP_URL+"/signalr-hubs/Notification?&userId="+localStorage.getItem('userId')?.toString(), {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets,
            })
            .build();
        }
        else{

        
        this._hubConnection = new signalR.HubConnectionBuilder()
        .configureLogging(LogLevel.Debug)
        .withUrl(environment.NOTIFICATION_APP_URL+"/signalr-hubs/Notification", {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets,
        })
        .build();
    }

     console.log("Connection 1");

        this._hubConnection
            .start()
            .then(() => {
                console.log("Connection started");
                this._hubConnection.invoke("GetConnectionId");
                this._hubConnection.on('NotifyClient',  (message) => { // Register for incoming messages
                  this.showMessage(message)
                  this.notificationService.addNotification("1");
                });
            })
            .catch((err) => console.log("Error while establishing a connection :(   ud "));
    }
}
