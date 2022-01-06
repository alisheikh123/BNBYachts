using BnBYachts.Chat.Chat;
using BnBYachts.Chat.Domain.Shared.Interfaces;
using BnBYachts.Chat.Hubs;
using BnBYachts.Chat.Requestables;
using BnBYachts.Chat.Transferables;
using BnBYachts.Shared.Model;
using Microsoft.AspNetCore.SignalR;
using NUglify.Helpers;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.ObjectMapping;

namespace BnBYachts.Chat.Managers
{
    public class ChatManager : DomainService, IChatManager
    {
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly IUserConnectionManager _userConnectionManager;
        private readonly IRepository<ChatEntity, int> _chatRepository;
        private readonly IRepository<UserInfo, int> _userInfoRepository;
        private readonly IObjectMapper<ChatDomainModule> _objectMapper;
        private readonly IRepository<BlockedUsersEntity, int> _blockedUserRepository;
        private readonly IRepository<ArchivedChatsEntity, int> _archivedChatRepository;

        public ChatManager(IHubContext<ChatHub> hubContext, IUserConnectionManager userConnectionManager,
            IRepository<ChatEntity, int> chatRepository, IObjectMapper<ChatDomainModule> objectMapper,
            IRepository<UserInfo, int> userInfoRepository, IRepository<BlockedUsersEntity, int> blockedUserRepository,
            IRepository<ArchivedChatsEntity, int> archivedChatRepository)
        {
            _hubContext = hubContext;
            _userConnectionManager = userConnectionManager;
            _chatRepository = chatRepository;
            _objectMapper = objectMapper;
            _userInfoRepository = userInfoRepository;
            _blockedUserRepository = blockedUserRepository;
            _archivedChatRepository = archivedChatRepository;
        }
        public async Task InsertChat(ChatRequestable inputData)
        {
            var obj = new ChatEntity
            {
                SenderId = inputData.SenderId,
                ReceiverId = inputData.ReceiverId,
                Message = inputData.Message,
                ReadDate = DateTime.Now,
                SentDate = DateTime.Now,
                CreationTime = DateTime.Now
            };
            var response = await _chatRepository.InsertAsync(obj, autoSave: true);
        }

        public async Task<ChatMessagesTransferable> GetUserChats(string senderId, string receiverId)
        {
            var response = new ChatMessagesTransferable();
            var result = await _chatRepository.GetListAsync(x => x.SenderId == senderId && x.ReceiverId == receiverId || x.ReceiverId == senderId && x.SenderId == receiverId).ConfigureAwait(false);
            foreach (var chat in result.FindAll(res => res.IsRead == false))
            {
                chat.IsRead = true;
            }
            var getBlockedUser = await _blockedUserRepository.FindAsync(res => (res.BlockedUserId.ToLower() == receiverId.ToLower() && res.UserId.ToLower() == senderId.ToLower())
            || (res.BlockedUserId.ToLower() == senderId.ToLower() && res.UserId.ToLower() == receiverId.ToLower())).ConfigureAwait(false);
            response.Chats = _objectMapper.Map<ICollection<ChatEntity>, ICollection<ChatTransferable>>(result);
            response.IsBlockedUser = getBlockedUser != null ? true : false;
            response.IsBlockedByMe = getBlockedUser != null && getBlockedUser.UserId.ToLower() == senderId.ToLower();
            return response;
        }

        public async Task<ICollection<ChatUserTransferable>> GetAllUsers(string hostId,string userToCheck)
        {
            var listOfAllUsersInChats = await _chatRepository.GetListAsync(x => x.ReceiverId == userToCheck || x.SenderId == userToCheck).ConfigureAwait(false);
            ICollection<UserInfo> listUsers = new List<UserInfo>();
            if (hostId != "undefined")
            {
                var findUser = await _userInfoRepository.FindAsync(res => res.UserId == hostId).ConfigureAwait(false);
                if (!listUsers.Contains(findUser))
                {
                    listUsers.Add(findUser);
                }
            }
            foreach (var chat in listOfAllUsersInChats.DistinctBy(x => x.SenderId))
            {
                var result = await _userInfoRepository.FindAsync(x => x.UserId == chat.SenderId).ConfigureAwait(false);
                if(result.UserId.ToLower() != userToCheck.ToLower())
                {
                    result.UnReadChatsCount=  await _chatRepository.CountAsync(res => res.ReceiverId.ToLower() == userToCheck.ToLower()
                    && res.SenderId.ToLower() == result.UserId.ToLower() && res.IsRead == false).ConfigureAwait(false);
                    var findArchived = await _archivedChatRepository.FirstOrDefaultAsync(res => res.ArchivedUserId.ToLower() == result.UserId.ToLower() && res.UserId.ToLower() == userToCheck.ToLower()).ConfigureAwait(false);
                    result.IsArchivedUser = findArchived != null;
                    var getBlockedUser = await _blockedUserRepository.FirstOrDefaultAsync(res => res.BlockedUserId.ToLower() == result.UserId.ToLower() && res.UserId.ToLower() == userToCheck.ToLower()).ConfigureAwait(false);
                    result.IsBlocked = getBlockedUser != null;
                    listUsers.Add(result);
                }
            }
            foreach (var chat in listOfAllUsersInChats.DistinctBy(x => x.ReceiverId))
            {
                var result = await _userInfoRepository.FindAsync(x => x.UserId == chat.ReceiverId).ConfigureAwait(false);
                if (result.UserId.ToLower() != userToCheck.ToLower() && !(listUsers.Contains(result)))
                {
                    result.UnReadChatsCount = await _chatRepository.CountAsync(res => res.ReceiverId.ToLower() == userToCheck.ToLower()
                    && res.SenderId.ToLower() == result.UserId.ToLower() && res.IsRead == false).ConfigureAwait(false);
                    var findArchived = await _archivedChatRepository.FirstOrDefaultAsync(res => res.ArchivedUserId.ToLower() == result.UserId.ToLower() && res.UserId.ToLower() == userToCheck.ToLower()).ConfigureAwait(false);
                    result.IsArchivedUser = findArchived != null;
                    var getBlockedUser = await _blockedUserRepository.FirstOrDefaultAsync(res => res.BlockedUserId.ToLower() == result.UserId.ToLower() && res.UserId.ToLower() == userToCheck.ToLower()).ConfigureAwait(false);
                    result.IsBlocked = getBlockedUser != null;
                    listUsers.Add(result);
                }
            }
            return _objectMapper.Map<ICollection<UserInfo>, ICollection<ChatUserTransferable>>(listUsers);
        }
        public async Task BlockUser(string blockedUserId,string userId,bool isBlock)
        {
            if (isBlock)
            {
                var data = new BlockedUsersEntity();
                data.BlockedUserId = blockedUserId;
                data.UserId = userId;
                data.CreationTime = DateTime.Now;
                await _blockedUserRepository.InsertAsync(data, true).ConfigureAwait(false);
            }
            else
            {
                var blockedUserEntity = await _blockedUserRepository.FindAsync(res => res.BlockedUserId.ToLower() == blockedUserId.ToLower() && res.UserId.ToLower() == userId.ToLower()).ConfigureAwait(false);
                await _blockedUserRepository.DeleteAsync(blockedUserEntity).ConfigureAwait(false);
            }
        }
        public async Task ArchiveChats(string archivedUserId, string userId,bool isArchive)
        {
            if (isArchive)
            {
                var data = new ArchivedChatsEntity();
                data.ArchivedUserId = archivedUserId;
                data.UserId = userId;
                data.CreationTime = DateTime.Now;
                await _archivedChatRepository.InsertAsync(data, true).ConfigureAwait(false);
            }
            else
            {
                var archivedEntity = await _archivedChatRepository.FindAsync(res => res.ArchivedUserId.ToLower() == archivedUserId.ToLower()
                && res.UserId.ToLower() == userId.ToLower()).ConfigureAwait(false);
                await _archivedChatRepository.DeleteAsync(archivedEntity).ConfigureAwait(false);
            }
        }

        public async Task<int> GetUnReadChatCounts(string userId)=>await _chatRepository.
            CountAsync(res => res.ReceiverId == userId && res.IsRead == false).ConfigureAwait(false);
    }
}
