using BnBYachts.Booking.Disputes;
using BnBYachts.Booking.Disputes.Interface;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using BnBYachts.Shared.Model;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking.Services
{
    public class DisputeAppService : ApplicationService, IDisputeAppService
    {
        private readonly IDisputeManager _manager;
        private readonly IConfiguration _config;
        private readonly EventBusDispatcher _eventBusDispatcher;
        public DisputeAppService(IDisputeManager manager, IConfiguration config, EventBusDispatcher eventBusDispatcher)
        {
            _manager = manager;
            _config = config;
            _eventBusDispatcher = eventBusDispatcher;
        }
        public async Task AddDispute(DisputeRequestableDto data)
        {

            await _manager.AddDispute(data).ConfigureAwait(false);
            string emailContent = await _manager.GetEmailContent(1);
            string adminEmail = _config.GetSection("Emails:admin").Value.ToString();
            string body = emailContent;
            body = body.Replace("{{message}}", data.Reason);
            await _eventBusDispatcher.Publish<IEmailContract>(new EmailContract
            {
                To = adminEmail,
                Subject = "Help Center Dispute",
                Body = new StringBuilder().Append(body),
                IsBodyHtml = true,
            });
        }
        public async Task<EntityResponseListModel<DisputeTransferable>> GetDisputeList(string SearchText, PaginationHeader pagination) => await _manager.GetDisputeList(SearchText, pagination);

    }
}



