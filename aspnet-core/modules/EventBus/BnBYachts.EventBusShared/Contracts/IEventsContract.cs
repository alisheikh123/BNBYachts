using BnByachts.Seeder.Shared;
using BnBYachts.EventBusShared.Contracts;
using System;


namespace BnBYachts.EventBusShared.Contracts
{
    public interface IEventsContract : IContractable
    {
        public  int BoatId { get; set; }
        public double LocationLat { get; set; }
        public double LocationLong { get; set; }
        public string Location { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int GuestCapacity { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public int AmountPerPerson { get; set; }
        public EventsType EventType { get; set; }
    
    }
    
    public class EventsContract : IEventsContract
{
        public int BoatId { get; set; }
        public double LocationLat { get; set; }
        public double LocationLong { get; set; }
        public string Location { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int GuestCapacity { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public int AmountPerPerson { get; set; }
        public EventsType EventType { get; set; }
    }
}
