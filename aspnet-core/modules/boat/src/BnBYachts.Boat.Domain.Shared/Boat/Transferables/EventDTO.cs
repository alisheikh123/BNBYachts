using BnBYachts.Boat.Interface;
using BnBYachts.Event.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace BnBYachts.Boat.Boat.Transferables
{
    public class EventDTO :ITransferable
    {
        public int? id { get; set; }
        public BoatDTO Boat { get; set; }
        public double LocationLat { get; set; }
        public double LocationLong { get; set; }
        public string Location { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int GuestCapacity { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public int AmountPerPerson { get; set; }
        public EventTypes EventType { get; set; }
        public virtual int? BoatId { get; set; }
        public bool? IsActive { get; set; }
    }
}
