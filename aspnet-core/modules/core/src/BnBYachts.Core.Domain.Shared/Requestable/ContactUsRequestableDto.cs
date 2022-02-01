using BnBYachts.Shared.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Core.Requestable
{
    public class ContactUsRequestableDto:IRequestable
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
        public string FileName { get; set; }
        public string FileAttachment { get; set; }
    }
}
