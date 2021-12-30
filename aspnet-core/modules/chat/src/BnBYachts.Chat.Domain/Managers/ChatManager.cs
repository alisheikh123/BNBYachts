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

        public ChatManager(IHubContext<ChatHub> hubContext, IUserConnectionManager userConnectionManager, IRepository<ChatEntity, int> chatRepository, IObjectMapper<ChatDomainModule> objectMapper, IRepository<UserInfo, int> userInfoRepository, IRepository<BlockedUsersEntity, int> blockedUserRepository)
        {
            _hubContext = hubContext;
            _userConnectionManager = userConnectionManager;
            _chatRepository = chatRepository;
            _objectMapper = objectMapper;
            _userInfoRepository = userInfoRepository;
            _blockedUserRepository = blockedUserRepository;
        }
        public async Task<ChatTransferable> SendMessage(ChatRequestable inputData)
        {
            ChatEntity obj = new ChatEntity
            {
                SenderId = inputData.SenderId,
                ReceiverId = inputData.ReceiverId,
                Message = inputData.Message,
                UserId = 1,
                ReadDate = DateTime.Now,
                SentDate = DateTime.Now,
                CreationTime = DateTime.Now
            };
            var response = await _chatRepository.InsertAsync(obj, autoSave: true);
            inputData.MessageId = response.Id;

            var connections = _userConnectionManager.GetUserConnections(inputData.ReceiverId);
            if (connections is { Count: > 0 })
            {
                foreach (var connectionId in connections)
                {
                    await _hubContext.Clients.Client(connectionId).SendAsync("sendToUser", inputData);
                }
            }

            var result = new ChatTransferable
            {
                Message = inputData.Message,
                SenderId = inputData.SenderId.ToUpper(),
                ReceiverId = inputData.ReceiverId.ToUpper(),
                User = inputData.User.ToUpper()
            };
            return result;
        }

        public async Task<ChatMessagesTransferable> GetUserChats(string senderId, string receiverId)
        {
            var response = new ChatMessagesTransferable();
            var result = await _chatRepository.GetListAsync(x => x.SenderId == senderId && x.ReceiverId == receiverId || x.ReceiverId == senderId && x.SenderId == receiverId).ConfigureAwait(false);
 
            var getBlockedUser = await _blockedUserRepository.FindAsync(res => res.BlockedUserId == senderId && res.UserId == receiverId).ConfigureAwait(false);
            response.Chats = _objectMapper.Map<ICollection<ChatEntity>, ICollection<ChatTransferable>>(result);
            response.IsBlockedUser = getBlockedUser !=null ? true : false;
            return response;
        }

        public async Task<ICollection<ChatUserTransferable>> GetAllUsers(string userToCheck)
        {
            var listOfAllUsersInChats = await _chatRepository.GetListAsync(x => x.ReceiverId == userToCheck || x.SenderId == userToCheck).ConfigureAwait(false);
            ICollection<UserInfo> listUsers = new List<UserInfo>();
            foreach (var chat in listOfAllUsersInChats.DistinctBy(x => x.SenderId))
            {
                var result = await _userInfoRepository.FindAsync(x => x.UserId == chat.SenderId).ConfigureAwait(false);
                if(result.UserId.ToLower() != userToCheck.ToLower())
                {
                    listUsers.Add(result);
                }
            }
            foreach (var chat in listOfAllUsersInChats.DistinctBy(x => x.ReceiverId))
            {
                var result = await _userInfoRepository.FindAsync(x => x.UserId == chat.ReceiverId).ConfigureAwait(false);
                if (result.UserId.ToLower() != userToCheck.ToLower() && !(listUsers.Contains(result)))
                {
                    listUsers.Add(result);
                }
            }
            return _objectMapper.Map<ICollection<UserInfo>, ICollection<ChatUserTransferable>>(listUsers);
        }
        public async Task BlockUser(string blockedUserId,string userId)
        {
            var data = new BlockedUsersEntity();
            data.BlockedUserId = blockedUserId;
            data.UserId = userId;
            data.CreationTime = DateTime.Now;
            await _blockedUserRepository.InsertAsync(data, true).ConfigureAwait(false);

        }
    }
}
