using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Core.Shared.Requestable
{
   
    public class UserRequestable
    {

        public Guid? Id { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public DateTime DOB { get; set; }
        public string RoleName { get; set; }
       
        
    }

    public class RolesRequestable
    {
        public string Name { get; set; }
        public string NormalizedName { get; set; }
        public bool IsDefault { get; set; }
        public bool IsStatic { get; set; }
        public bool IsPublic { get; set; }
    }
    public class UserRolesRequestable
    {
        public Guid? UserId { get; set; }
        public Guid? RoleId { get; set; }
      
    }
}
