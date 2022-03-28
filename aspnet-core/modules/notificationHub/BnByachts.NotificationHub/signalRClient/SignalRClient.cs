using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR.Client;

namespace BnByachts.NotificationHub.signalRClient
{
    public class SignalRClient
    {
       private readonly HubConnection _connection;
        public SignalRClient()
        {
            _connection = new HubConnectionBuilder()
                .WithUrl("https://localhost:5001/signalr-hubs/Notification")
                .Build();

            _connection.Closed += async (error) =>
            {
                await Task.Delay(new Random().Next(0, 5) * 1000);
                await _connection.StartAsync();
            };
        }

        public async Task SendMessage(string userId, string message)
        {
            await _connection.StartAsync().ConfigureAwait(false);
            await _connection.InvokeAsync("NotifyClient", userId, message);
        }
    }
}