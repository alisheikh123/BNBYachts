using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace BnByachts.NotificationHub.Services
{
    public interface IUserEmailer: ITransientDependency
    {
        Task SendPasswordResetLinkAsync(string link = null, string logUrl = null);
    }
}
