using System.Collections.Generic;
using System.Text;

namespace BnBYachts.EventBusShared.Contracts
{
    public interface IEmailContract: IContractable
    {
        public string From { get; set; }
        public string To { get; set; }
        public ICollection<string> Cc { get; set; }
        public string Subject { get; set; }
        public ICollection<string> Bcc { get; set; }
        public StringBuilder Body { get; set; }
        public bool IsBodyHtml { get; set; }

    }
    public class EmailContract : IEmailContract
    {
        public string From { get; set; }
        public string To { get; set; }
        public ICollection<string> Cc { get; set; }
        public string Subject { get; set; }
        public ICollection<string> Bcc { get; set; }
        public StringBuilder Body { get; set; }
        public bool IsBodyHtml { get; set; }
    }
}
