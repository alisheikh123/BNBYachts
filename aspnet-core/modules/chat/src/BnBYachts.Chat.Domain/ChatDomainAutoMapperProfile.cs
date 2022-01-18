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
            CreateMap<ChatEntity, ChatTransferable>().ForMember(res=>res.SentTime,opt=>opt.MapFrom(res=>res.SentDate));
            CreateMap<UserInfo, ChatUserTransferable>();
        }
    }
}

