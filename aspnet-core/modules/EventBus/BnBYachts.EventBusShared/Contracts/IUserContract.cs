using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.EventBusShared.Contracts
{
    public interface IUserContract : IContractable
    {
        public Guid? Id { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public DateTime DOB { get; set; }
        public string RoleName { get; set; }


    }
    public class UserContract : IUserContract
    {

        public Guid? Id { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public DateTime DOB { get; set; }
        public string RoleName { get; set; }
    }
}
