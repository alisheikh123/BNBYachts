

namespace BnBYachts.EventBusShared.Contracts
{
    public interface IHeartbeatContract: IContractable
    {
        string Message { get; }
    }

    public class HeartbeatContract:IHeartbeatContract
    {
        public string Message { get; set; }
    }

   
}
