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
        public async Task<EntityResponseListModel<DisputeTransferable>> GetDisputeList(string SearchText, PaginationHeader pagination)
        {
            var response = new EntityResponseListModel<DisputeTransferable>();
            var dispute = await _repo.GetListAsync().ConfigureAwait(false);
            var disputes = _objectMapper.Map<List<BookingDisputeEntity>, PagedList<DisputeTransferable>>(dispute);
            response.TotalCount = disputes.Count();
            response.Data = await PagedList<DisputeTransferable>.CreateAsync(disputes, pagination.CurrentPage, pagination.ItemsPerPage);
            if (!string.IsNullOrWhiteSpace(SearchText))
                response.Data = response.Data.Where(c => c.BookingType.Contains(SearchText) || c.DisputeReason.Contains(SearchText) || c.Status.Contains(SearchText)).ToList();
            return response;
        }
        public async Task<string> GetEmailContent(int templateId)
        {
            var email = await _repoTemplates.GetAsync(res => res.TemplateId == templateId).ConfigureAwait(false);
            return email.EmailContent.ToString();
        }
    }
}
