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
        public async Task<ChatMessagesTransferable> GetUserChats(string userId) => await _chatManager.GetUserChats(CurrentUser.Id.ToString(), userId);
        public async Task<ICollection<ChatUserTransferable>> GetAllUsers(string? hostId) => await _chatManager.GetAllUsers(hostId,CurrentUser.Id.ToString());
        public async Task BlockUser(string blockedUserId,bool isBlock) => await _chatManager.BlockUser(blockedUserId,CurrentUser.Id.ToString(),isBlock);
        public async Task ArchiveChats(string archivedUserId,bool isArchive) => await _chatManager.ArchiveChats(archivedUserId, CurrentUser.Id.ToString(), isArchive);
        public async Task<int> GetUnReadChatCounts() => await _chatManager.GetUnReadChatCounts(CurrentUser.Id.ToString());
    }
}
