using System;
using System.Linq;
using System.Threading.Tasks;
using BnBYachts.Notification.Notification.IManager;
using Microsoft.AspNetCore.SignalR;
using Volo.Abp.AspNetCore.SignalR;

namespace BnBYachts.Socket.Web.Hub
{
    public class NotificationHub : AbpHub
    {
        private readonly IUserConnectionManager _userConnectionManager;
        public NotificationHub(IUserConnectionManager userConnectionManager)
        {
            _userConnectionManager = userConnectionManager;
        }

        public string GetConnectionId()
        {
            var httpContext = this.Context.GetHttpContext();
            var userId = "1";//httpContext?.Request.Query["userId"];
            _userConnectionManager.KeepUserConnection(userId, Context.ConnectionId);
            return Context.ConnectionId;
        }
        //AdminPortal Notify
        public async Task NotifyClient(string receiverId, string content)
        {
            var connectionId = _userConnectionManager.GetUserConnections(receiverId).FirstOrDefault();
            await Clients.Client(connectionId ?? "").SendAsync("NotifyClient", content);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var connectionId = Context.ConnectionId;
            _userConnectionManager.RemoveUserConnection(connectionId);
            await Task.FromResult(0);
        }
    }
}
