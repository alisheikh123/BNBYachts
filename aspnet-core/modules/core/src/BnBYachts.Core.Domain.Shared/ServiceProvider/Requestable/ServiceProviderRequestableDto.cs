using System;
using System.Collections.Generic;
using System.Text;
using BnBYachts.Core.Enum;
using BnBYachts.Shared.Interface;

namespace BnBYachts.Core.ServiceProvider.Requestable
{
   public class ServiceProviderRequestableDto : IRequestable
    {  public  int Id { get; set; }
        public string UserId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyProfilePicture { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Bio { get; set; }
        public double? Experience { get; set; }
        public double? Fee { get; set; }
        public CaptainPaymentType? PaymentOption { get; set; }
        public ServiceProviderType ServiceProviderType { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string AccountName { get; set; }
        public string BankName { get; set; }
        public string ZipCode { get; set; }
        public string Iban { get; set; }
        public string Swift { get; set; }
        public string SupportiveDoc { get; set; }
        public ICollection<TimeSlotRequestableDto> TimeSlots { get; set; }
    }
}
