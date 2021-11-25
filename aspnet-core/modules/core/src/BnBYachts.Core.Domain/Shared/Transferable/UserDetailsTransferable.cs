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


        internal UserDetailsTransferable()
        {
        }

        internal UserDetailsTransferable(string userId, string fullName, string imagePath, ICollection<IdentityUserRole> userRoles,DateTime creationTime)
        {
            Id = userId;
            Name = fullName;
            ImagePath = imagePath;
            Roles = userRoles;
            CreationTime = creationTime;
        }
    }
    public static class UserFactory
    {
        public static UserDetailsTransferable Contruct(string userId, string fullName, string imagePath, ICollection<IdentityUserRole> userRoles,DateTime creationTime)
        {
            return new UserDetailsTransferable(userId, fullName, imagePath, userRoles,creationTime);
        }
    }
}
