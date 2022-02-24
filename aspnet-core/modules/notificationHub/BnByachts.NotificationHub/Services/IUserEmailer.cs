using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnByachts.NotificationHub.Services
{
    public interface IUserEmailer
    {
        Task SendPasswordResetLinkAsync(string link = null, string logUrl = null);
    }
}
