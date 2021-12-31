using AutoMapper;
using BnBYachts.Chat.Chat;
using BnBYachts.Chat.Transferables;
using Volo.Abp.AutoMapper;

namespace BnBYachts.Boat
{
    public class ChatDomainAutoMapperProfile:Profile
    {
        public ChatDomainAutoMapperProfile()
        {
            CreateMap<ChatEntity, ChatTransferable>();
            CreateMap<UserInfo, ChatUserTransferable>();
        }
    }
}

