using BnBYachts.Boat.Boat.Interfaces;
using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Boat.Event.Requestable;
using BnBYachts.Boat.Event.Transferables;
using BnBYachts.Events;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.ObjectMapping;

namespace BnBYachts.Boat.Manager
{
    public class EventManager : DomainService, IEventManager
    {
        private readonly IRepository<BoatEntity, int> _boatRepository;
        private readonly IRepository<EventEntity, int> _eventRepository;
        private readonly IObjectMapper<BoatDomainModule> _objectMapper;
        public EventManager(IRepository<BoatEntity, int> boatRepository, IObjectMapper<BoatDomainModule> objectMapper, IRepository<EventEntity, int> eventRepository)
        {
            _boatRepository = boatRepository;
            _objectMapper = objectMapper;
            _eventRepository = eventRepository;
        }

        public async Task<ICollection<BoatLookupTransferable>> GetBoats(Guid? userId)
        {
            var boats = await _boatRepository.GetListAsync(res => res.CreatorId == userId).ConfigureAwait(false);
            return _objectMapper.Map<ICollection<BoatEntity>, ICollection<BoatLookupTransferable>>(boats);

        }

        public async Task<bool> SaveEvent(EventRequestable boatEvent)
        {
            var eventDetails = await _eventRepository.InsertAsync(_objectMapper.Map<EventRequestable, EventEntity>(boatEvent), true).ConfigureAwait(false);
            return eventDetails.Id > 0 ? true : false;
        }

        public async Task<BoatEventCalendarTransferable> GetBoatBookedDates(int boatId)
        {
            var allEvents = _objectMapper.Map<ICollection<EventEntity>, ICollection<EventRequestable>>(await _eventRepository.GetListAsync(res => res.BoatId == boatId).ConfigureAwait(false));
            var boatBookedDates = new BoatEventCalendarTransferable();
            foreach (var evnt in allEvents)
            {
                do
                {
                    boatBookedDates.BookedDates.Add(evnt.StartDateTime);
                    evnt.StartDateTime = evnt.StartDateTime.AddDays(1);
                } while (evnt.StartDateTime.Date <= evnt.EndDateTime.Date);
            }
            return boatBookedDates;
        }

        public async Task<ICollection<EventDTO>> GetEvents(Guid? userId)
        {
            var events = await _eventRepository.GetListAsync(res => res.CreatorId == userId).ConfigureAwait(false);
            foreach (var evnt in events)
            {
                await _eventRepository.EnsurePropertyLoadedAsync(evnt, res => res.Boat).ConfigureAwait(false);
                await _boatRepository.EnsureCollectionLoadedAsync(evnt.Boat, res => res.BoatGalleries).ConfigureAwait(false);
            }
            return _objectMapper.Map<ICollection<EventEntity>,ICollection<EventDTO>>(events);
        }
    }
}
