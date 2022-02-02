using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using BnByachts.NotificationHub.Services;
using MassTransit;

namespace BnByachts.NotificationHub.Consumers
{
    public class EmailConsumer : IConsumer<IEmailContract>
    {
        private readonly IMailer _mailer;
        public EmailConsumer(IMailer mailer)
        {
            _mailer = mailer;
        }
        public async Task Consume(ConsumeContext<IEmailContract> context)
        {
            await _mailer.SendEmailAsync(context.Message.To,context.Message.Subject, context.Message.Body.ToString(),false,context.Message.FileAttachment,context.Message.FileName);
        }
    }
}
