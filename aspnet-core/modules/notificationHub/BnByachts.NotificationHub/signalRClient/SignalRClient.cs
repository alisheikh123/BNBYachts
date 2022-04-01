using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR.Client;

namespace BnByachts.NotificationHub.signalRClient
{
    public class SignalRClient
    {
       private readonly HubConnection _connection;
        public SignalRClient(string url= "http://notification.bnb.techverxapps.com/signalr-hubs/Notification")
        {
            //

            _connection = new HubConnectionBuilder()
                .WithUrl(url)
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