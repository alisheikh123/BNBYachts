using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace BnByachts.NotificationHub.Services.Phone_Verification
{
    public interface IPhoneVerificationCode
    {
        Task SendOTPAsync(string phoneNumber, string otpCode);
    }
    
}
