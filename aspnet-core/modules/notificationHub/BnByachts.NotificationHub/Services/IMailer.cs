using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using Volo.Abp.DependencyInjection;

namespace BnByachts.NotificationHub.Services
{
    public interface IMailer : ITransientDependency
    {
        Task SendEmailAsync(string email, string subject, string body, bool IsBodyHtml);
    }
}
