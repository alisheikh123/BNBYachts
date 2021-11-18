using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Payments.Shared.Transferable
{
   public class UserPaymentMethodTransferable
    {
        public string Id { get; set; }
        public string CardHolderName { get; set; }
        public string LastFourDigit { get; set; }

        public bool IsDefault { get; set; }
        public string CardType { get; set; }
        internal UserPaymentMethodTransferable()
        {
        }

        internal UserPaymentMethodTransferable(string id, string cardHolderName, string lastFourDigts, bool isDefault, string cardType)
        {
            Id = id;
            CardHolderName = cardHolderName;
            LastFourDigit = lastFourDigts;
            IsDefault = isDefault;
            CardType = cardType;
        }

    }
    public static class UserPaymentMethodTransferableFactory
    {
        public static UserPaymentMethodTransferable Contruct(string id, string cardHolderName, string lastFourDigts, bool isDefault, string cardType)
        {
            return new UserPaymentMethodTransferable(id, cardHolderName, lastFourDigts, isDefault, cardType);
        }
    }
}