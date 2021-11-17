using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Payments.PaymentVM
{
    public class UserPaymentMethods
    {
        public string Id { get; set; }
        public string CardHolderName { get; set; }
        public string LastFourDigit { get; set; }

        public bool IsDefault { get; set; }
        public string CardType { get; set; }
        internal UserPaymentMethods()
        {
        }

        internal UserPaymentMethods(string id, string cardHolderName, string lastFourDigts, bool isDefault,string cardType)
        {
            Id = id;
            CardHolderName = cardHolderName;
            LastFourDigit= lastFourDigts;
            IsDefault= isDefault;
            CardType = cardType;
        }

    }
    public static class UserPaymentMethodsFactory
    {
        public static UserPaymentMethods Contruct(string id, string cardHolderName, string lastFourDigts, bool isDefault,string cardType)
        {
            return new UserPaymentMethods(id, cardHolderName, lastFourDigts, isDefault,cardType);
        }
    }
}
