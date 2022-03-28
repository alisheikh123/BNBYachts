using System;
using System.Threading.Tasks;
using Volo.Abp.AspNetCore.SignalR;

namespace BnBYachts.Socket.Web.Hub
{
    public class NotificationHub: AbpHub
    {
        public async Task SendMessage(string targetUserName, string message)
        {

            Console.WriteLine($"{targetUserName} {message }");
            await Task.CompletedTask;
        }
    }
}
