using BnBYachts.Chat.Requestables;
using BnBYachts.Chat.Transferables;
using BnBYachts.Shared.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BnBYachts.Chat.Domain.Shared.Interfaces
{
    public interface IChatManager
    {
        Task InsertChat(ChatRequestable inputData);
        Task<ChatMessagesTransferable> GetUserChats(string senderId, string receiverId);
        Task<ICollection<ChatUserTransferable>> GetAllUsers(string hostId,string userId);
        Task BlockUser(string blockedUserId,string userId, bool isBlock);
        Task ArchiveChats(string archivedUserId, string userId,bool isArchive);
        Task<int> GetUnReadChatCounts(string userId);
    }
}