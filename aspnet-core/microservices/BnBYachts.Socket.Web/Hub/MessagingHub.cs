using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Volo.Abp.AspNetCore.SignalR;

namespace BnBYachts.Socket.Web.Hub
{
    
    public class MessagingHub : AbpHub
    {
        public async Task SendMessage(string targetUserName, string message)
        {

            Console.WriteLine($"{targetUserName} {message }");
            await Task.CompletedTask;
        }

        public async Task ShowNotification(string connectionId)
        {
            await Clients.Client(connectionId).SendAsync("Notification", "it's me");
        }
    }
}
