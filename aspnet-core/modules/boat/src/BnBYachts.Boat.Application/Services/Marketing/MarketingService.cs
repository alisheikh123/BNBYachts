using BnBYachts.Boat.Interfaces.Marketing;
using BnBYachts.Boat.Marketing;
using BnBYachts.Boat.Marketing.Requestable;
using BnBYachts.Boat.Marketing.Transferable;
using BnBYachts.Shared.Model;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Boat.Services.Marketing
{
    [Authorize]
    public class MarketingService : ApplicationService, IMarketingService
    {
        private readonly IMarketingManager _manager;
        public MarketingService(IMarketingManager manager) => _manager = manager;
        public async Task<EntityResponseModel> AddCity(FeaturedCityRequestable featured) => await _manager.AddCity(featured).ConfigureAwait(false);

        public async Task<EntityResponseModel> AddMarketingDetail(MarketingRequestable featured)
            => await _manager.AddMarketingDetail(featured);

        public async Task DeleteFeaturedCity(int? id) => await _manager.DeleteFeaturedCity(id).ConfigureAwait(false);

        public async Task DeleteMarketPage(int? id) => await _manager.DeleteMarketPage(id).ConfigureAwait(false);
        [AllowAnonymous]
        public async Task<List<FeaturedCityTransferable>> GetCities() => await _manager.GetCities().ConfigureAwait(false);

        public async Task<List<MarketingTransferable>> GetMarketPages() => await _manager.GetMarketPages().ConfigureAwait(false);

        public async Task<EntityResponseModel> UpdateFeatureCity(FeaturedCityRequestable featured) => await _manager.UpdateFeatureCity(featured).ConfigureAwait(false);

        public async Task<EntityResponseModel> UpdateMarketingPage(MarketingRequestable featured)
            => await _manager.UpdateMarketingPage(featured).ConfigureAwait(false);
    }
}