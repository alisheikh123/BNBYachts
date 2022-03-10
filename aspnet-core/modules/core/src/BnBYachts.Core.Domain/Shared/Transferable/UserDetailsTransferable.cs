using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
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
         #nullable enable
        public List<RolesTransferable>? UserRoles { get; set; }
        #nullable disable
        public string About { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsPhoneConfirmed { get; set; }
        public bool IsEmailConfirmed { get; set; }
        public string Email { get; set; }
        public bool IsInitialLogin { get; set; }


        internal UserDetailsTransferable()
        {
        }

        internal UserDetailsTransferable(string userId, string fullName, string imagePath, ICollection<IdentityUserRole> roles , DateTime creationTime, string about, string phoneNumber, bool isPhoneConfirmed, string email,bool initialLogin,bool isEmailConfirmed, [Optional]List<RolesTransferable>? userRoles )
        {
            Id = userId;
            Name = fullName;
            ImagePath = imagePath;
            Roles = roles;
            UserRoles = userRoles;
            CreationTime = creationTime;
            About = about;
            PhoneNumber = phoneNumber;
            IsPhoneConfirmed = isPhoneConfirmed;
            Email = email;
            IsInitialLogin = initialLogin;
            IsEmailConfirmed = isEmailConfirmed;

        }
    }
    public static class UserFactory
    {
        public static UserDetailsTransferable Contruct(string userId, string fullName, string imagePath, ICollection<IdentityUserRole> roles, DateTime creationTime, string about, string phoneNumber, bool isPhoneConfirmed, string email,bool IsInitialLogin,bool IsEmailConfirmed, [Optional] List<RolesTransferable>  userRoles)
        {
            return new UserDetailsTransferable(userId, fullName, imagePath, roles, creationTime, about, phoneNumber, isPhoneConfirmed, email, IsInitialLogin, IsEmailConfirmed, userRoles);
        }
    }
}
