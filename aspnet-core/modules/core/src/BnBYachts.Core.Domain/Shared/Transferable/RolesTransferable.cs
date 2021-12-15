using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Core.Shared.Transferable
{
    public class RolesTransferable
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string NormalizedName { get; set; }
        public bool IsDefault { get; set; }
        public bool IsStatic { get; set; }
        public bool IsPublic { get; set; }
    }
}
