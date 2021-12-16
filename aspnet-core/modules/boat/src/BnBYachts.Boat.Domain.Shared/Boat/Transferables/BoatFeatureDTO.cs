using BnBYachts.Boat.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Boat.Boat.Transferables
{
    public class BoatFeatureDTO:ITransferable
    {
        public virtual int? BoatEntityId { get; set; }
        public virtual int? OfferedFeaturesId { get; set; }
    }
}
