using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using Volo.Abp.DependencyInjection;

namespace BnByachts.NotificationHub.Services
{
   public interface IMailer:ITransientDependency
   {
       Task SendEmail(IEmailContract input);
   }
}
