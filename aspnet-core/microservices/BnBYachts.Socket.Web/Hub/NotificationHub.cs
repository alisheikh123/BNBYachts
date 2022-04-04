using System;
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

        public async Task<string> GetConnectionId()
        {
            var httpContext = this.Context.GetHttpContext();
            var userId = httpContext?.Request.Query["userId"].ToString();
            if (!string.IsNullOrEmpty(userId))
            {
                await _userConnectionManager.KeepUserConnection(userId, Context.ConnectionId).ConfigureAwait(false);
            }
            return Context.ConnectionId;
        }
        //AdminPortal Notify
        public async Task NotifyClient(string receiverId, string content)
        {
            async void Action(string connectionId)
            {
                await Clients.Client(connectionId ?? "").SendAsync("NotifyClient", content).ConfigureAwait(false);
            }
            (await _userConnectionManager.GetUserConnections(receiverId).ConfigureAwait(false)).ForEach(Action);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var connectionId = Context.ConnectionId;
            await _userConnectionManager.RemoveUserConnection(connectionId).ConfigureAwait(false);
        }
    }
}
