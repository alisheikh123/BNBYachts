using BnBYachts.Booking.Shared.BoatBooking.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;

namespace BnBYachts.Booking.Managers
{
    public class HostBoatBookingManager : DomainService, IHostBoatBookingManager
    {
        private readonly IRepository<BoatelBookingEntity, int> _boatelBookingRepository;
        public HostBoatBookingManager(IRepository<BoatelBookingEntity, int> repository)
        {
            _boatelBookingRepository = repository;
        }

        public async Task<bool> BoatelBooking(BoatelBookingEntity data,Guid? userId)
        {
            data.LastModifierId = data.CreatorId = userId;
            data.UserId = userId.ToString();
            var response = await _boatelBookingRepository.InsertAsync(data).ConfigureAwait(false);
            if (response.Id > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
