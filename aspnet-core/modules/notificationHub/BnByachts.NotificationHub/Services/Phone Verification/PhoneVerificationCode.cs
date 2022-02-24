using BnByachts.NotificationHub.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace BnByachts.NotificationHub.Services.Phone_Verification
{
    public class PhoneVerificationCode : IPhoneVerificationCode
    {
        private OTPMessageSetting OTPMessageSetting { get; set; }
        public PhoneVerificationCode(IOptions<OTPMessageSetting> otpMessageSetting)
        {
            OTPMessageSetting = otpMessageSetting.Value;
        }
        public async Task SendOTPAsync(string phoneNumber, string otpCode)
        {
                TwilioClient.Init(OTPMessageSetting.AccountSID, OTPMessageSetting.AuthToken);
                var messageOptions = new CreateMessageOptions(new PhoneNumber(phoneNumber));
                messageOptions.MessagingServiceSid = OTPMessageSetting.MessagingServiceSID;
                messageOptions.Body = "your OTP of BNBYachts is " + otpCode;
                MessageResource.Create(messageOptions);
                Console.WriteLine("OTP sended");
                await Task.Run(()=>true);
        }
    }
}
