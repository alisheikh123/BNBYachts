using AutoMapper;
using BnBYachts.Boat.Shared.Boat.Requestable;
using BnBYachts.EventBusShared.Contracts;

namespace BnByachts.SeedObservable
{
    public class SeederObserverableAutoMapperProfile:Profile
    {
        public SeederObserverableAutoMapperProfile()
        {
            CreateMap<IHostBoatContract, HostBoatRequestable>();
        }

    }
}
