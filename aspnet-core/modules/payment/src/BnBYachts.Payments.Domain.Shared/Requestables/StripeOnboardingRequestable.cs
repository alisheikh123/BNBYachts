using BnBYachts.Shared.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Payments.Requestables
{
    public class StripeOnboardingRequestable:IRequestable
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? DOB { get; set; }
        public string SSN { get; set; }
        public string Street1 { get; set; }
        public string Email { get; set; }
        public string Street2 { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }
        public string State { get; set; }
        public string Phone { get; set; }
        public string AccountHolderName { get; set; }
        public string AccountHolderType { get; set; }
        public string AccountNumber { get; set; }
        public string RoutingNumber{ get; set; }
    }
}
