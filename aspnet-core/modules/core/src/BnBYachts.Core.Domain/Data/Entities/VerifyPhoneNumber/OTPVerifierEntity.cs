using Volo.Abp.Domain.Entities.Auditing;

namespace BnBYachts.Core.Data.Model.VerifyPhoneNumber
{
   public class OTPVerifierEntity :AuditedAggregateRoot<int>
    {
        public string UserId { get; set; }
        public string PhoneNumber { get; set; }
        public string OTPCode { get; set; }
    }
}
