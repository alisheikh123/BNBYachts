using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace BnByachts.NotificationHub.Services.Phone_Verification
{
    public interface IPhoneVerificationCode: ITransientDependency
    {
        Task SendOTPAsync(string phoneNumber, string otpCode);
    }
    
}
