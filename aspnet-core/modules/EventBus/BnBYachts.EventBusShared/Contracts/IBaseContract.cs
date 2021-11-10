using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.EventBusShared.Contracts
{
    public interface IContractable
    {

    }

    public interface IBaseContract : IContractable
    {
        int TenantId { get; }
        long UserId { get; }
    }
}
