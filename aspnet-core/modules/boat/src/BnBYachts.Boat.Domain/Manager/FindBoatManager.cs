using BnBYachts.Boat.Boat.Interfaces;
using BnBYachts.Boat.Helpers;
using BnBYachts.Boat.Shared.Boat.Requestable;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.ObjectMapping;

namespace BnBYachts.Boat.Manager
{
    public class FindBoatManager : DomainService, IFindBoatManager
    {
        private readonly IRepository<BoatEntity, int> _boatRepo;
        private readonly IObjectMapper<BoatDomainModule> _objectMapper;
        public FindBoatManager(IRepository<BoatEntity, int> boatRepo, IObjectMapper<BoatDomainModule> objectMapper)
        {
            _boatRepo = boatRepo;
            _objectMapper = objectMapper;
        }
        public async Task<EntityResponseListModel<HostBoatRequestable>> FindUsBoats(double latitude, double longitude)
        {
            try
            {
                var getBoats = await _boatRepo.GetListAsync(res => res.IsBoatelServicesOffered == true && res.IsActive == true);
                return new EntityResponseListModel<HostBoatRequestable>
                {
                    Data = _objectMapper.Map<List<BoatEntity>, List<HostBoatRequestable>>(getBoats.FindAll(res =>
                  DistanceCalculator.GetDistanceInMeters(res.Latitude, res.Longitude, latitude, longitude) <= 1000))
                };
            }
            catch (Exception ex)
            {

                throw;
            }

        }
    }
}
