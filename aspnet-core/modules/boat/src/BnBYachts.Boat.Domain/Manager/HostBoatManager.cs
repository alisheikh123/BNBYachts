using BnByachts.SharedModule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BnBYachts.Boat.Enum;
using BnByachts.SharedModule.Manager.Boat.Requestable;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;

namespace BnBYachts.Boat.Manager
{
    public class HostBoatManager : DomainService, IHostBoatManager
    {
        private readonly IRepository<BoatEntity, int> _boatRepository;

        public HostBoatManager(IRepository<BoatEntity, int> boatRepository)
        {
            _boatRepository = boatRepository;


        }
        public async Task<HostBoatRequestable> Insert(HostBoatRequestable input)
        {
            var boat = new BoatEntity
            {
                Name = "my Boat",
                Length = 200,
                TotalBedrooms = 2,
                TotalWashrooms = 3,
                IsBoatelServicesOffered = true,
                BoatelAvailabilityDays = 20,
                CheckinTime = new DateTime(),
                CheckoutTime = new DateTime().AddDays(3),
                Latitude = 32.073978,
                Longitude = 72.686073,
                PerDayCharges = 200,
                IsActive = true,
                BoatType = BoatTypes.PowerBoat,
                CreationTime = new DateTime()
            };
            var response =await _boatRepository.InsertAsync(boat, true);
            return new HostBoatRequestable();

        }
    }
}
