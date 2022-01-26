using BnBYachts.Boat.Boat.Interfaces;
using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Boat.Calendar;
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
        private readonly IRepository<BoatCalendarEntity, int> _boatelCalendarRepository;
        //Charters
        private readonly IRepository<CharterEntity, int> _charterRepository;
        private readonly IRepository<EventEntity, int> _eventRepository;
        //Lookups
        private readonly IObjectMapper<BoatDomainModule> _objectMapper;

        public BoatCalendarManager(IRepository<BoatEntity, int> boatRepository, IRepository<CharterEntity, int> charterRepository,
            IRepository<EventEntity, int> eventRepository, IObjectMapper<BoatDomainModule> objectMapper,
            IRepository<BoatCalendarEntity, int> boatelCalendarRepository)
        {
            _boatRepository = boatRepository;
            _charterRepository = charterRepository;
            _eventRepository= eventRepository;  
            _objectMapper = objectMapper;
            _boatelCalendarRepository = boatelCalendarRepository;
        }
        public async Task<EntityResponseModel> GetBoatCalendar(Guid? hostId, int month, int boatId)
        {
            var getBoatels = await _boatelCalendarRepository.GetListAsync(res => res.BoatEntityId == boatId  && (res.FromDate.Month == month || res.ToDate.Month == month)).ConfigureAwait(false);
            var getChartes = await _charterRepository.GetListAsync(res => res.CreatorId == hostId && res.BoatId == boatId && res.DepartureFromDate.Month == month).ConfigureAwait(false);
            var getEvents = await _eventRepository.GetListAsync(res => res.CreatorId == hostId && res.BoatId == boatId && res.StartDateTime.Month == month).ConfigureAwait(false);
            var response = new BoatCalendarTransferable();
            response.Boatels = _objectMapper.Map<ICollection<BoatCalendarEntity>, ICollection<CalendarTransferable>>(getBoatels);
            response.Charters = _objectMapper.Map<ICollection<CharterEntity>, ICollection<CalendarTransferable>>(getChartes);
            response.Events = _objectMapper.Map<ICollection<EventEntity>, ICollection<CalendarTransferable>>(getEvents);
            return new EntityResponseModel()
            {
                Data = response
            };
        }
        public async Task<EntityResponseModel> GetBoatCalendar(int boatId, DateTime calendarDate)
        {
            var findData = await _boatelCalendarRepository.FindAsync(res => res.BoatEntityId == boatId && res.FromDate.Date == calendarDate.Date && res.ToDate.Date == calendarDate.Date).ConfigureAwait(false);
            return new EntityResponseModel()
            {
                Data = _objectMapper.Map<BoatCalendarEntity, CalendarRequestableDto>(findData)
            };
        }
        public async Task UpdateBoatCalendar(CalendarRequestableDto calendar)
        {
            var data = _objectMapper.Map<CalendarRequestableDto, BoatCalendarEntity>(calendar);
            var findData = await _boatelCalendarRepository.FindAsync(res => res.BoatEntityId == calendar.BoatEntityId && res.FromDate.Date == calendar.FromDate.Date && res.ToDate.Date == calendar.ToDate.Date).ConfigureAwait(false);
            if (findData == null)
            {
                await _boatelCalendarRepository.InsertAsync(data).ConfigureAwait(false);
            }
            else
            {
                _objectMapper.Map<CalendarRequestableDto, BoatCalendarEntity>(calendar, findData);
                await _boatelCalendarRepository.UpdateAsync(findData, true).ConfigureAwait(false);
            }
        }
    }
}
