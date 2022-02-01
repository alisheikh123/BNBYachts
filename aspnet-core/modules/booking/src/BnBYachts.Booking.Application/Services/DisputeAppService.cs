using BnBYachts.Booking.Disputes;
using BnBYachts.Booking.Disputes.Interface;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
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
            string adminEmail = _config.GetSection("Emails:admin").Value.ToString();
            var path = Directory.GetCurrentDirectory() + @"\wwwroot\templates";
            string body = string.Empty;
            using (StreamReader reader = new StreamReader(path + @"\dispute.html"))
            {
                body = reader.ReadToEnd();
            }
            body = body.Replace("{{message}}", data.Reason);
            await _eventBusDispatcher.Publish<IEmailContract>(new EmailContract
            {
                To = adminEmail,
                Subject = "Help Center Dispute",
                Body = new StringBuilder().Append(body),
                IsBodyHtml = true,
            });

        }
    }
}



