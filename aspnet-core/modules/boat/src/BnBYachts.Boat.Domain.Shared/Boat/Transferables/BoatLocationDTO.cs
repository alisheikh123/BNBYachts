using BnBYachts.Boat.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Boat.Boat.Transferables
{
    public class BoatLocationDTO:ITransferable
    {
        public string CurrentLat { get; set; }
        public string CurrentLong { get; set; }
        public string NextLocCity { get; set; }
        public string NextLocState { get; set; }
        public int NextLocZip { get; set; }
        public string NextLocCountry { get; set; }
        public virtual int? BoatId { get; set; }
    }
}
