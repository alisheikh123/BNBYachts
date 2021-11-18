using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.EventBusShared.Contracts
{
    public interface IEmailContract: IContractable
    {
        public string To { get; set; }
        public ICollection<string> Cc { get; set; }
        public string Subject { get; set; }
        public ICollection<string> Bcc { get; set; }
        public StringBuilder Content { get; set; }

    }
    public class EmailContract : IEmailContract
    {
        public string To { get; set; }
        public ICollection<string> Cc { get; set; }
        public string Subject { get; set; }
        public ICollection<string> Bcc { get; set; }
        public StringBuilder Content { get; set; }
    }
}
