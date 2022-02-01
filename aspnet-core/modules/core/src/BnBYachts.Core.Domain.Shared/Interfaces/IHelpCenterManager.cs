using BnBYachts.Core.Requestable;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Core.Interfaces
{
    public interface IHelpCenterManager
    {
        Task<string> GetEmailContent(int templateId);

    }
}
