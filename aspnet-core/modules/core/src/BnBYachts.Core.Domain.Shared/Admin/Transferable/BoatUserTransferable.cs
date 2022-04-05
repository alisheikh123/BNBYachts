using System;
using System.Collections.Generic;
using Volo.Abp.Identity;


namespace BnBYachts.Core.Admin.Transferable
{
    public class BoatUserTransferable
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string ImagePath { get; set; }
        public DateTime CreationTime { get; set; }
        public string About { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public bool IsActive { get; set; }
    }
}
