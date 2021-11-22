using System.Net.Mail;
using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using Volo.Abp.Emailing;

namespace BnByachts.NotificationHub.Services
{
    public class Mailer : IMailer
    {
        private readonly IEmailSender _emailSender;

        public Mailer(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }

        public async Task SendEmail(IEmailContract input)
        {
            try
            {

                await _emailSender.SendAsync(
                    "u.draz@gems.techverx.com",     // target email address
                    "Email subject",         // subject
                    "This is email body..."  // email body
                    ,false
                );
            }
            catch (System.Exception e)
            {

                throw;
            }
        }
    }
}
