using BnBYachts.Core.Interface;
using BnBYachts.Core.Requestable;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
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
        private readonly IConfiguration _config;
        public HelpCenterAppService(EventBusDispatcher eventBusDispatcher,IConfiguration config)
        {
            _eventBusDispatcher = eventBusDispatcher;
            _config = config;
        }
        public async Task ContactUS(ContactUsRequestableDto form)
        {
                string adminEmail = _config.GetSection("Emails:admin").Value.ToString();
                var path = Directory.GetCurrentDirectory() + @"\wwwroot\templates";
                string body = string.Empty;
                using (StreamReader reader = new StreamReader(path+ @"\contact-us.html"))
                {
                    body = reader.ReadToEnd();
                }
               body =  body.Replace("{{firstName}}", form.FirstName).Replace("{{lastName}}",form.LastName).Replace("{{email}}",form.Email).Replace("{{message}}",form.Message);
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
    }
}
