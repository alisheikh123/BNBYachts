
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
                .WithUrl("https://localhost:44358/signalr-hubs/Messaging")
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
            await connection.InvokeAsync("SendMessage", "test1","test2");

        }
    }
    }