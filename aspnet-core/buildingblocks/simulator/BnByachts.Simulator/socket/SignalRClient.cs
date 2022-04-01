
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR.Client;

namespace BnByachts.Simulator.socket
{
    public class SignalRClient
    {
        HubConnection connection;
        public SignalRClient()
        {

            connection = new HubConnectionBuilder()
                .WithUrl("http://notification.bnb.techverxapps.com/signalr-hubs/Notification")
                .Build();

            connection.Closed += async (error) =>
            {
                await Task.Delay(new Random().Next(0, 5) * 1000);
                await connection.StartAsync();
            };
        }



        
        public async Task SendMessage()
        {
            await connection.StartAsync().ConfigureAwait(false);
            await connection.InvokeAsync("NotifyClient", "cd7d68fb-f11d-a1a7-1ee2-3a011cc4ec72", "Payment has been recived");

        }
    }
    }