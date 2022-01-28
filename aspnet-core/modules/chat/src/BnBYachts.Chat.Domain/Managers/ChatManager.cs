using BnBYachts.Chat.Chat;
using BnBYachts.Chat.Domain.Shared.Interfaces;
using BnBYachts.Chat.Hubs;
using BnBYachts.Chat.Requestables;
using BnBYachts.Chat.Transferables;
using BnBYachts.Shared.Model;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using NUglify.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.ObjectMapping;
using Volo.Abp.Uow;

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
        public ILogger<ChatManager> _logger { get; set; }
        private readonly IUnitOfWorkManager _unitOfWorkManager;

        public ChatManager(IHubContext<ChatHub> hubContext, IUserConnectionManager userConnectionManager,
            IRepository<ChatEntity, int> chatRepository, IObjectMapper<ChatDomainModule> objectMapper,
            IRepository<UserInfo, int> userInfoRepository, IRepository<BlockedUsersEntity, int> blockedUserRepository,
            IRepository<ArchivedChatsEntity, int> archivedChatRepository, ILogger<ChatManager> logger, IUnitOfWorkManager unitOfWorkManager)
        {
            _hubContext = hubContext;
            _userConnectionManager = userConnectionManager;
            _chatRepository = chatRepository;
            _objectMapper = objectMapper;
            _userInfoRepository = userInfoRepository;
            _blockedUserRepository = blockedUserRepository;
            _archivedChatRepository = archivedChatRepository;
            _logger = logger;
            _unitOfWorkManager = unitOfWorkManager;
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
            _logger.LogInformation("Chat Insert Request : " + _unitOfWorkManager.Current.Id.ToString());
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
            listOfAllUsersInChats = listOfAllUsersInChats.OrderByDescending(res => res.SentDate).ToList();
            ICollection<UserInfo> listUsers = new List<UserInfo>();
            if (hostId != "undefined")
            {
                var findUser = await _userInfoRepository.FindAsync(res => res.UserId == hostId).ConfigureAwait(false);
                if (!listUsers.Contains(findUser))
                {
                    listUsers.Add(findUser);
                }
            }
            foreach (var chat in listOfAllUsersInChats)
            {
                var senderUser = await _userInfoRepository.FirstOrDefaultAsync(x => x.UserId == chat.SenderId && x.UserId.ToLower() != userToCheck.ToLower()).ConfigureAwait(false);
                var recieverUser = await _userInfoRepository.FirstOrDefaultAsync(x => x.UserId == chat.ReceiverId && x.UserId.ToLower() != userToCheck.ToLower()).ConfigureAwait(false);
                if (senderUser!=null && !listUsers.Contains(senderUser))
                {
                    senderUser.UnReadChatsCount=  await _chatRepository.CountAsync(res => res.ReceiverId.ToLower() == userToCheck.ToLower()
                    && res.SenderId.ToLower() == senderUser.UserId.ToLower() && res.IsRead == false).ConfigureAwait(false);
                    var findArchived = await _archivedChatRepository.FirstOrDefaultAsync(res => res.ArchivedUserId.ToLower() == senderUser.UserId.ToLower() && res.UserId.ToLower() == userToCheck.ToLower()).ConfigureAwait(false);
                    senderUser.IsArchivedUser = findArchived != null;
                    var getBlockedUser = await _blockedUserRepository.FirstOrDefaultAsync(res => res.BlockedUserId.ToLower() == senderUser.UserId.ToLower() && res.UserId.ToLower() == userToCheck.ToLower()).ConfigureAwait(false);
                    senderUser.IsBlocked = getBlockedUser != null;
                    var chatList = await _chatRepository.GetListAsync(res=>res.SenderId == senderUser.UserId || res.ReceiverId == senderUser.UserId).ConfigureAwait(false);
                    senderUser.LastMessage = chatList.LastOrDefault().Message;
                    listUsers.Add(senderUser);
                }
                if (recieverUser !=null && !listUsers.Contains(recieverUser))
                {
                    recieverUser.UnReadChatsCount = await _chatRepository.CountAsync(res => res.ReceiverId.ToLower() == userToCheck.ToLower()
                    && res.SenderId.ToLower() == recieverUser.UserId.ToLower() && res.IsRead == false).ConfigureAwait(false);
                    var findArchived = await _archivedChatRepository.FirstOrDefaultAsync(res => res.ArchivedUserId.ToLower() == recieverUser.UserId.ToLower() && res.UserId.ToLower() == userToCheck.ToLower()).ConfigureAwait(false);
                    recieverUser.IsArchivedUser = findArchived != null;
                    var getBlockedUser = await _blockedUserRepository.FirstOrDefaultAsync(res => res.BlockedUserId.ToLower() == recieverUser.UserId.ToLower() && res.UserId.ToLower() == userToCheck.ToLower()).ConfigureAwait(false);
                    recieverUser.IsBlocked = getBlockedUser != null;
                    var chatList = await _chatRepository.GetListAsync(res => res.SenderId == recieverUser.UserId || res.ReceiverId == recieverUser.UserId).ConfigureAwait(false);
                    recieverUser.LastMessage = chatList.LastOrDefault().Message;
                    listUsers.Add(recieverUser);
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
