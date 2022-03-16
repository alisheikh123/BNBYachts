using BnBYachts.Boat.Marketing.Requestable;
using BnBYachts.Boat.Marketing.Transferable;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Marketing
{
    public interface IMarketingManager
    {
        Task<List<FeaturedCityTransferable>> GetCities();
        Task<EntityResponseModel> AddCity(FeaturedCityRequestable featured);
        Task<EntityResponseModel> UpdateFeatureCity(FeaturedCityRequestable featured);
        Task DeleteFeaturedCity(int? id);
        Task<EntityResponseModel> AddMarketingDetail(MarketingRequestable featured);
        Task DeleteMarketPage(int? id);
        Task<List<MarketingTransferable>> GetMarketPages();
        Task<EntityResponseModel> UpdateMarketingPage(MarketingRequestable featured);
        Task getMarketPageByMarketingType(int? MarketingTypeId);
    }
}