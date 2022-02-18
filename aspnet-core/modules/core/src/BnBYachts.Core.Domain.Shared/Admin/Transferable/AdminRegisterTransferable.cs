using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Core.Admin.Transferable
{
    public class AdminRegisterTransferable
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public DateTime DOB { get; set; }
        public string Password { get; set; }
        public IEnumerable<string> RoleId { get; set; }
    }
}
