using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace BnByachts.NotificationHub.Services
{
    public interface IMailer : ITransientDependency
    {
        Task SendEmailAsync(string email, string subject, string body, bool IsBodyHtml, string? attachment = null, string? fileName = null);
    }
}
