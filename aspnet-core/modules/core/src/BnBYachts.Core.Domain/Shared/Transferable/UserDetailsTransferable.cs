using System;
using System.Collections.Generic;
using Volo.Abp.Identity;

namespace BnBYachts.Core.Shared.Transferable
{
    public class UserDetailsTransferable
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string ImagePath { get; set; }
        public DateTime CreationTime { get; set; }
        public ICollection<IdentityUserRole> Roles { get; set; }
        public string About { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsPhoneConfirmed { get; set; }
        public string Email { get; set; }
        public bool IsInitialLogin { get; set; }


        internal UserDetailsTransferable()
        {
        }

        internal UserDetailsTransferable(string userId, string fullName, string imagePath, ICollection<IdentityUserRole> userRoles, DateTime creationTime, string about, string phoneNumber, bool isPhoneConfirmed, string email,bool initialLogin)
        {
            Id = userId;
            Name = fullName;
            ImagePath = imagePath;
            Roles = userRoles;
            CreationTime = creationTime;
            About = about;
            PhoneNumber = phoneNumber;
            IsPhoneConfirmed = isPhoneConfirmed;
            Email = email;
            IsInitialLogin = initialLogin;

        }
    }
    public static class UserFactory
    {
        public static UserDetailsTransferable Contruct(string userId, string fullName, string imagePath, ICollection<IdentityUserRole> userRoles, DateTime creationTime, string about, string phoneNumber, bool isPhoneConfirmed, string email,bool IsInitialLogin)
        {
            return new UserDetailsTransferable(userId, fullName, imagePath, userRoles, creationTime, about, phoneNumber, isPhoneConfirmed, email, IsInitialLogin);
        }
    }
}
