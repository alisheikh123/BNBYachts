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
            await _emailSender.SendAsync(new MailMessage
            {
                Body = input.Body.ToString(),
                Subject = input.Subject,
                To = { input.To }
            }).ConfigureAwait(false);
        }
    }
}
