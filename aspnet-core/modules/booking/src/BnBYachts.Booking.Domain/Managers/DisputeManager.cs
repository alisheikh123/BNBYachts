using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Disputes;
using BnBYachts.Booking.Disputes.Interface;
using BnBYachts.Shared.Model;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<bool> ChangeDisputeStatus(ChangeStatusRequestable status)
        {
            var data = await _repo.GetAsync(x => x.Id == status.Id).ConfigureAwait(false);
            if (data == null) return false;
            data.Status = status.status;
            await _repo.UpdateAsync(data).ConfigureAwait(false);
            return true;
        }

        public async Task<DisputeTransferable> GetDisputebyId(int id) => _objectMapper.Map<BookingDisputeEntity, DisputeTransferable>(await _repo.GetAsync(id).ConfigureAwait(false));

        public async Task<List<DisputeTransferable>> GetDisputeList() => _objectMapper.Map<List<BookingDisputeEntity>, List<DisputeTransferable>>(await _repo.GetListAsync().ConfigureAwait(false));
        public async Task<string> GetEmailContent(int templateId)
        {
            var email = await _repoTemplates.GetAsync(res => res.TemplateId == templateId).ConfigureAwait(false);
            return email.EmailContent.ToString();
        }
    }
}
