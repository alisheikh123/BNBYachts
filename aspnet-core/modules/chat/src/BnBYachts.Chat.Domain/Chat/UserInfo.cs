using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Chat.Chat
{
    public class UserInfo : AuditedAggregateRoot<int>
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string ImagePath { get; set; }
    }
}
