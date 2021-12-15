using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.EventBusShared.Contracts
{
    public interface IHostBoatFeaturesContract : IContractable
    {

       
        public  int BoatEntityId { get; set; }
        public  int OfferedFeaturesId { get; set; }
    }
    public class HostBoatFeaturesContract : IHostBoatFeaturesContract
    {

        public  int BoatEntityId { get; set; }
        public  int OfferedFeaturesId { get; set; }
    }
}
