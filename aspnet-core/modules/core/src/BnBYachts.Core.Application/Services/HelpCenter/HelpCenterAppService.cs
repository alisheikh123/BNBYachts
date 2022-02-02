using BnBYachts.Core.Interface;
using BnBYachts.Core.Interfaces;
using BnBYachts.Core.Requestable;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using BnBYachts.Shared.Model;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Core.Services.HelpCenter
{
    public class HelpCenterAppService : ApplicationService, IHelpCenterAppService
    {
        private readonly EventBusDispatcher _eventBusDispatcher;
        private readonly IHelpCenterManager _manager;
        private readonly IConfiguration _config;
        public HelpCenterAppService(EventBusDispatcher eventBusDispatcher, IConfiguration config, IHelpCenterManager manager)
        {
            _eventBusDispatcher = eventBusDispatcher;
            _config = config;
            _manager = manager;
        }
        public async Task ContactUS(ContactUsRequestableDto form)
        {
            string adminEmail = _config.GetSection("Emails:admin").Value.ToString();
            string body = await _manager.GetEmailContent(1).ConfigureAwait(false);
            body = body.Replace("{{firstName}}", form.FirstName).Replace("{{lastName}}", form.LastName).Replace("{{email}}", form.Email).Replace("{{message}}", form.Message);
            await _eventBusDispatcher.Publish<IEmailContract>(new EmailContract
            {
                To = adminEmail,
                Subject = "Help Center Contact Us",
                Body = new StringBuilder().Append(body),
                IsBodyHtml = true,
                FileName = form.FileName,
                FileAttachment = form.FileAttachment

            });
        }

        public async Task<EntityResponseListModel<FrequentQuestionsDto>> GetFrequentQuestions()
            => await _manager.GetFrequentQuestions().ConfigureAwait(false);
    }
}
