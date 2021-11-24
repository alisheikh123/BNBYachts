using System.Collections.Generic;
using Volo.Abp.Identity;

namespace BnBYachts.Core.Shared.Transferable
{
    public class UserDetailsTransferable
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string ImagePath { get; set; }
        public ICollection<IdentityUserRole> Roles { get; set; }


        internal UserDetailsTransferable()
        {
        }

        internal UserDetailsTransferable(string userId, string fullName, string imagePath, ICollection<IdentityUserRole> userRoles)
        {
            Id = userId;
            Name = fullName;
            ImagePath = imagePath;
            Roles = userRoles;
        }
    }
    public static class UserFactory
    {
        public static UserDetailsTransferable Contruct(string userId, string fullName, string imagePath, ICollection<IdentityUserRole> userRoles)
        {
            return new UserDetailsTransferable(userId, fullName, imagePath, userRoles);
        }
    }
}
