using BnBYachts.Boat.Boat.Interfaces;
using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Boat.Event.Requestable;
using BnBYachts.Boat.Event.Transferables;
using BnBYachts.Events;
using BnBYachts.Shared.Model;
using Microsoft.Extensions.Logging;
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
        private readonly ILogger<IEventManager> _logger;
        public EventManager(IRepository<BoatEntity, int> boatRepository, IObjectMapper<BoatDomainModule> objectMapper, IRepository<EventEntity, int> eventRepository, ILogger<IEventManager> logger)
        {
            _boatRepository = boatRepository;
            _objectMapper = objectMapper;
            _eventRepository = eventRepository;
            _logger = logger;
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

        public async Task<EntityResponseListModel<EventDTO>> GetEvents(Guid? userId, int pageNo, int pageSize)
        {
            var response = new EntityResponseListModel<EventDTO>();
            var events = await _eventRepository.GetListAsync(res => res.CreatorId == userId).ConfigureAwait(false);
            foreach (var evnt in events)
            {
                await _eventRepository.EnsurePropertyLoadedAsync(evnt, res => res.Boat).ConfigureAwait(false);
                await _boatRepository.EnsureCollectionLoadedAsync(evnt.Boat, res => res.BoatGalleries).ConfigureAwait(false);
            }
            var hostEventList = _objectMapper.Map<List<EventEntity>, List<EventDTO>>(events);
            response.TotalCount = events.Count;
            response.Data = await PagedList<EventDTO>.CreateAsync(hostEventList, pageNo, pageSize).ConfigureAwait(false);
            return response;
        }

        public async Task<EntityResponseModel> GetEventById(int eventId)
        {
            var response = new EntityResponseModel();
            var targetEvent = await _eventRepository.GetAsync(res => res.Id == eventId).ConfigureAwait(false);
            await _eventRepository.EnsurePropertyLoadedAsync(targetEvent, res => res.Boat).ConfigureAwait(false);
            response.Data = _objectMapper.Map<EventEntity, EventDTO>(targetEvent);
            return response;
        }

        public async Task<bool> UpdateEvent(EventRequestable updatedEvent, Guid? userId)
        {
            var targetEvent = await _eventRepository.FindAsync(res => res.Id == updatedEvent.Id);
            targetEvent.LastModifierId = userId;
            targetEvent.LastModificationTime = DateTime.Now;
            _objectMapper.Map<EventRequestable, EventEntity>(updatedEvent, targetEvent);            
            var response = await _eventRepository.UpdateAsync(targetEvent, autoSave: true).ConfigureAwait(false);
            return true;
        }
       public async Task<bool> UpdateEventStatus(long eventId)
        {
            var events = await _eventRepository.FindAsync(x => x.Id == eventId).ConfigureAwait(false);
            events.IsActive = !events.IsActive;
            return true;

        }
        public async Task<bool> UpdateEventLocation(EventLocationRequestable eventDetails, Guid? userId)
        {
            var eventEntity = await _eventRepository.FindAsync(res => res.Id == eventDetails.Id).ConfigureAwait(false);
            _objectMapper.Map<EventLocationRequestable, EventEntity>(eventDetails, eventEntity);
            if (eventEntity != null)
            {
                eventEntity.LastModifierId = userId;
                eventEntity.LastModificationTime = DateTime.Now;
                await _eventRepository.UpdateAsync(eventEntity, autoSave: true).ConfigureAwait(false);
                _logger.LogInformation("Update the Location of Event");
                return true;
            }
            return false;
        }
    }
}
