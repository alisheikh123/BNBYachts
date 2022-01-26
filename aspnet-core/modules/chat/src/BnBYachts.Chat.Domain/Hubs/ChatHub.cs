//using BnBYachts.Chat.Interfaces;
using BnBYachts.Chat.Domain.Shared.Interfaces;
using BnBYachts.Chat.Managers;
using BnBYachts.Chat.Requestables;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using Volo.Abp.AspNetCore.SignalR;
using Volo.Abp.Uow;

namespace BnBYachts.Chat.Hubs
{
    public class ChatHub : AbpHub
    {
        private readonly IUserConnectionManager _userConnectionManager;
        private readonly IChatManager _chatManager;
        public ILogger<ChatManager> _logger  { get; set; }
        private readonly IUnitOfWorkManager _unitOfWorkManager;

        public ChatHub(IUserConnectionManager userConnectionManager, IChatManager chatManager, ILogger<ChatManager> logger, IUnitOfWorkManager unitOfWorkManager)
        {
            _userConnectionManager = userConnectionManager;
            _chatManager = chatManager;
            _logger = logger;
            _unitOfWorkManager = unitOfWorkManager;
    }
        public string GetConnectionId()
        {
            var httpContext = this.Context.GetHttpContext();
            var userId = httpContext.Request.Query["userId"];
            _userConnectionManager.KeepUserConnection(userId, Context.ConnectionId);
            return Context.ConnectionId;
        }
        public async Task SendMessage(ChatRequestable inputData)
        {
            var connections = _userConnectionManager.GetUserConnections(inputData.ReceiverId);
            if (connections is { Count: > 0 })
            {
                foreach (var connectionId in connections)
                {
                    await Clients.Client(connectionId).SendAsync("sendToUser", inputData).ConfigureAwait(false);
                }
            }
            //Saving into db
            await _chatManager.InsertChat(inputData).ConfigureAwait(false);
            _logger.LogInformation("Chat Service Request : "+_unitOfWorkManager.Current.Id.ToString());
        }
        //Called when a connection with the hub is terminated.
        public async override Task OnDisconnectedAsync(Exception exception)
        {
            var connectionId = Context.ConnectionId;
            _userConnectionManager.RemoveUserConnection(connectionId);
            await Task.FromResult(0);
        }
        public Task JoinGroup(string group)
        {
            return Groups.AddToGroupAsync(Context.ConnectionId, group);
        }
        public Task LeaveGroup(string group)
        {
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, group);
        }
        public Task SendMessageToGroup(string groupname, string sender, string message)
        {
            return Clients.Group(groupname).SendAsync("SendMessage", sender, message);
        }
    }
}
