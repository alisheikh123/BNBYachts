using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.EventBusShared.Contracts
{
    public interface IUserRolesContract : IContractable
    {
        public Guid? UserId { get; set; }
        public Guid? RoleId { get; set; }
       
    }
    public class UserRolesContract : IUserRolesContract
    {

        public Guid? UserId { get; set; }
        public Guid? RoleId { get; set; }
    }
}
