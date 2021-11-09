using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.EventBus;

namespace BnBYachts.EventBusShared.Contracts
{
    public interface IHeartbeatContract 
    {
        string Message { get; }
    }

    [EventName("Test.AppHeartbeatContractText")]
    public class AppHeartbeatContract
    {

        public string Message { get; set; }
    }

   // [EventName("Test.App1ToApp2Text")] //Optional event name
    public class App1ToApp2TextEventData
    {
        public string TextMessage { get; set; }

        public App1ToApp2TextEventData()
        {

        }

        public App1ToApp2TextEventData(string textMessage)
        {
            TextMessage = textMessage;
        }
    }
}
