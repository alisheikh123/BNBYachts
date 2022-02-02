using BnBYachts.Core.Requestable;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Core.Interface
{
    public interface IHelpCenterAppService
    {
        Task ContactUS(ContactUsRequestableDto form);
    }
}
