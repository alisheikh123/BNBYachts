using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Core.Data.Model
{
    public class CoreEmailTemplatesEntity:AuditedAggregateRoot<int>
    {
        public int TemplateId { get; set; }
        public string EmailContent { get; set; }
    }
}
