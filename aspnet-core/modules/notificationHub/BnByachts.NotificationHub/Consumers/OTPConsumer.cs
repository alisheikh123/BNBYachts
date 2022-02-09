using BnByachts.NotificationHub.Services.Phone_Verification;
using BnBYachts.EventBusShared.Contracts;
using MassTransit;
using System.Threading.Tasks;

namespace BnByachts.NotificationHub.Consumers
{
    public class OTPConsumer : IConsumer<IOTPContract>
    {
        private readonly IPhoneVerificationCode _phoneVerificationCode;
        public OTPConsumer(IPhoneVerificationCode phoneVerificationCode)
        {
            _phoneVerificationCode = phoneVerificationCode;
        }
        public async Task Consume(ConsumeContext<IOTPContract> context)
        {
            await _phoneVerificationCode.SendOTPAsync(context.Message.PhoneNumber, context.Message.OTPCode);
        }
    }
}
