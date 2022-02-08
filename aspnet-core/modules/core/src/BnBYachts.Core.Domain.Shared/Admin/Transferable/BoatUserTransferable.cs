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
        //public ICollection<IdentityUserRole> Roles { get; set; }
        public string About { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public string Email { get; set; }


        internal BoatUserTransferable()
        {
        }

        internal BoatUserTransferable(string userId, string fullName, string imagePath, 
            //ICollection<IdentityUserRole> userRoles, 
            DateTime creationTime, string about, string phoneNumber, bool PhoneNumberConfirmed, string email)
        {
            Id = userId;
            Name = fullName;
            ImagePath = imagePath;
            //Roles = userRoles;
            CreationTime = creationTime;
            About = about;
            PhoneNumber = phoneNumber;
            PhoneNumberConfirmed = PhoneNumberConfirmed;
            Email = email;

        }
    }
    public static class UserFactory
    {
        public static BoatUserTransferable Contruct(string userId, string fullName, string imagePath, 
            //ICollection<IdentityUserRole> userRoles,
            DateTime creationTime, string about, string phoneNumber, bool PhoneNumberConfirmed, string email)
        {
            return new BoatUserTransferable(userId, fullName, imagePath,
                //userRoles,
                creationTime, about, phoneNumber, PhoneNumberConfirmed, email);
        }
    }
}
