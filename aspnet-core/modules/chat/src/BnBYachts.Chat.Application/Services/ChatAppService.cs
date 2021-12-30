using BnBYachts.Chat.Domain.Shared.Interfaces;
using BnBYachts.Chat.Requestables;
using BnBYachts.Chat.Transferables;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Chat.Services
{
    [Authorize]
    public class ChatAppService : ApplicationService
    {
        private readonly IChatManager _chatManager;
        public ChatAppService(IChatManager chatManager)
        {
            _chatManager = chatManager;
        }
        public async Task<ChatTransferable> SendMessage(ChatRequestable inputData) => await _chatManager.SendMessage(inputData);
        public async Task<ChatMessagesTransferable> GetUserChats(string userId) => await _chatManager.GetUserChats(CurrentUser.Id.ToString(), userId);
        public async Task<ICollection<ChatUserTransferable>> GetAllUsers() => await _chatManager.GetAllUsers(CurrentUser.Id.ToString());
        public async Task BlockUser(string blockedUserId) => await _chatManager.BlockUser(blockedUserId,CurrentUser.Id.ToString());
    }
}
