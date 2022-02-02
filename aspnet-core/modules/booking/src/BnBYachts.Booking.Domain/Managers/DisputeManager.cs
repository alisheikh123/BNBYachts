using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Disputes;
using BnBYachts.Booking.Disputes.Interface;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.ObjectMapping;

namespace BnBYachts.Booking.Managers
{
    public class DisputeManager: DomainService,IDisputeManager
    {
        private readonly IRepository<BookingDisputeEntity, int> _repo;
        private readonly IRepository<BookingEmailsTemplates, int> _repoTemplates;
        private readonly IObjectMapper<BookingDomainModule> _objectMapper;
        public DisputeManager(IRepository<BookingDisputeEntity, int> repo, IObjectMapper<BookingDomainModule> objectMapper, IRepository<BookingEmailsTemplates, int> repoTemplates)
        {
            _repo = repo;
            _objectMapper = objectMapper;
            _repoTemplates = repoTemplates;
        }

        public async Task AddDispute(DisputeRequestableDto data)
        => await _repo.InsertAsync(_objectMapper.Map<DisputeRequestableDto, BookingDisputeEntity>(data),true).ConfigureAwait(false);

        public async Task<string> GetEmailContent(int templateId)
        {
            var email = await _repoTemplates.GetAsync(res => res.TemplateId == templateId).ConfigureAwait(false);
            return email.EmailContent.ToString();
        }
    }
}
