using BnBYachts.Boat.Boat.Interfaces;
using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Boats.Charter;
using BnBYachts.Events;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.ObjectMapping;

namespace BnBYachts.Boat.Manager.Calendar
{
    public class BoatCalendarManager : DomainService, IBoatCalendarManager
    {
        private readonly IRepository<BoatEntity, int> _boatRepository;
        //Charters
        private readonly IRepository<CharterEntity, int> _charterRepository;
        private readonly IRepository<EventEntity, int> _eventRepository;
        //Lookups
        private readonly IObjectMapper<BoatDomainModule> _objectMapper;

        public BoatCalendarManager(IRepository<BoatEntity, int> boatRepository, IRepository<CharterEntity, int> charterRepository,
            IRepository<EventEntity, int> eventRepository, IObjectMapper<BoatDomainModule> objectMapper)
        {
            _boatRepository = boatRepository;
            _charterRepository = charterRepository;
            _eventRepository= eventRepository;  
            _objectMapper = objectMapper;
        }
        public async Task<EntityResponseModel> GetBoatCalendar(Guid? hostId, int month, int boatId)
        {
            var getChartes = await _charterRepository.GetListAsync(res => res.CreatorId == hostId && res.BoatId == boatId && res.DepartureFromDate.Month == month).ConfigureAwait(false);
            var getEvents = await _eventRepository.GetListAsync(res => res.CreatorId == hostId && res.BoatId == boatId && res.StartDateTime.Month == month).ConfigureAwait(false);
            var response = new BoatCalendarTransferable();
            response.Charters = _objectMapper.Map<ICollection<CharterEntity>, ICollection<CalendarTransferable>>(getChartes);
            response.Events = _objectMapper.Map<ICollection<EventEntity>, ICollection<CalendarTransferable>>(getEvents);
            return new EntityResponseModel()
            {
                Data = response
            };
        }
    }
}
