using BnBYachts.Core.Interface;
using BnBYachts.Core.Interfaces;
using BnBYachts.Core.Requestable;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using BnBYachts.Shared.Model;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Core.Services.HelpCenter
{
    public class HelpCenterAppService : ApplicationService, IHelpCenterAppService
    {
        private readonly EventBusDispatcher _eventBusDispatcher;
        private readonly IHelpCenterManager _manager;
        private AdminConfigurations AdminConfigurations { get; set; }
        public HelpCenterAppService(EventBusDispatcher eventBusDispatcher, IHelpCenterManager manager, IOptions<AdminConfigurations> adminConfigurations)
        {
            _eventBusDispatcher = eventBusDispatcher;
            AdminConfigurations = adminConfigurations.Value;
            _manager = manager;
        }
        public async Task<EntityResponseModel> ContactUS(ContactUsRequestableDto form)
        {
            var email = await _manager.GetEmailContent(1).ConfigureAwait(false);
            string body = email.Data.ToString();             
            body = body.Replace("{{firstName}}", form.FirstName).Replace("{{lastName}}", form.LastName).Replace("{{email}}", form.Email).Replace("{{message}}", form.Message);
            await _eventBusDispatcher.Publish<IEmailContract>(new EmailContract
            {
                To = AdminConfigurations.Email,
                Subject = "Help Center Contact Us",
                Body = new StringBuilder().Append(body),
                IsBodyHtml = true,
                FileName = form.FileName,
                FileAttachment = form.FileAttachment

            });
            return new EntityResponseModel()
            {
                Errors = null
            };
        }

        public async Task<EntityResponseListModel<FrequentQuestionsDto>> GetFrequentQuestions()
            => await _manager.GetFrequentQuestions().ConfigureAwait(false);
    }
}
