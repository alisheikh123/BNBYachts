using BnBYachts.Boat.Boat.FeaturedCity;
using BnBYachts.Boat.Boat.Marketing;
using BnBYachts.Boat.Marketing;
using BnBYachts.Boat.Marketing.Requestable;
using BnBYachts.Boat.Marketing.Transferable;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.ObjectMapping;

namespace BnBYachts.Boat.Manager.Marketing
{
    public class MarketingManager : DomainService, IMarketingManager
    {
        private readonly IRepository<FeaturedCityEntity, int> _repository;
        private readonly IRepository<MarketingPageEntity, int> _marketingRepository;
        private readonly IObjectMapper<BoatDomainModule> _objectMapper;
        private readonly EventBusDispatcher _eventBusDispatcher;
        public MarketingManager(IRepository<FeaturedCityEntity, int> repository, IObjectMapper<BoatDomainModule> objectMapper, 
            IRepository<MarketingPageEntity, int> marketingRepository,
            EventBusDispatcher eventBusDispatcher)
        {
            _repository = repository;
            _objectMapper = objectMapper;
            _marketingRepository = marketingRepository;
            _eventBusDispatcher = eventBusDispatcher;
        } 
        public async Task<EntityResponseModel> AddCity(FeaturedCityRequestable featured)
        {
            var response = new EntityResponseModel();
            var data = _objectMapper.Map<FeaturedCityRequestable, FeaturedCityEntity>(featured);
            await _eventBusDispatcher.Publish<IS3FileContract>(new S3FileContract
            {
                ChildFolder = "",
                File = Convert.FromBase64String(featured.FeaturedCityGallery.FileData.Split("base64,")[1]),
                FileName = featured.FeaturedCityGallery.FileName,
                ContentType = featured.FeaturedCityGallery.FileType,
                SubFolder = "cities"
            }).ConfigureAwait(false);

            data.imagePath = featured.FeaturedCityGallery.FileName;
            response.Data = await _repository.InsertAsync(data).ConfigureAwait(false);
            return response;
        }
        public async Task DeleteFeaturedCity(int? id)
            => await _repository.DeleteAsync(x => x.Id == id);
        public async Task<List<FeaturedCityTransferable>> GetCities()
            => _objectMapper.Map<List<FeaturedCityEntity>, List<FeaturedCityTransferable>>(await _repository.GetListAsync().ConfigureAwait(false));
        public async Task<EntityResponseModel> UpdateFeatureCity(FeaturedCityRequestable featured)
        {
            var response = new EntityResponseModel();
            var data = _objectMapper.Map<FeaturedCityRequestable, FeaturedCityEntity>(featured, await _repository.GetAsync(x => x.Id == featured.Id).ConfigureAwait(false));
            featured.FeaturedCityGallery.BoatEntityId = data.Id;
            await _eventBusDispatcher.Publish<IS3FileContract>(new S3FileContract
            {
                ChildFolder = "",
                File = Convert.FromBase64String(featured.FeaturedCityGallery.FileData.Split("base64,")[1]),
                FileName = featured.FeaturedCityGallery.FileName,
                ContentType = featured.FeaturedCityGallery.FileType,
                SubFolder = "cities"
            });

            data.imagePath = featured.FeaturedCityGallery.FileName;
            response.Data = await _repository.UpdateAsync(data);
            return response;
        }
        public async Task<EntityResponseModel> AddMarketingDetail(MarketingRequestable featured)
                => new EntityResponseModel(){ Data = await _marketingRepository.InsertAsync(_objectMapper.Map<MarketingRequestable, MarketingPageEntity>(featured)).ConfigureAwait(false)}; 
        public async Task DeleteMarketPage(int? id)
            => await _marketingRepository.DeleteAsync(x => x.Id == id);
        public async Task<List<MarketingTransferable>> GetMarketPages()
            => _objectMapper.Map<List<MarketingPageEntity>, List<MarketingTransferable>>(await _marketingRepository.GetListAsync().ConfigureAwait(false));
        public async Task<EntityResponseModel> UpdateMarketingPage(MarketingRequestable featured)
        {
            var response = new EntityResponseModel();
            var data = _objectMapper.Map<MarketingRequestable, MarketingPageEntity>(featured, await _marketingRepository.GetAsync(x => x.Id == featured.Id).ConfigureAwait(false));
            response.Data = await _marketingRepository.UpdateAsync(data);
            return response;
        }
        public async Task getMarketPageByMarketingType(int? MarketingTypeId)
            => await _marketingRepository.GetAsync(x => ((int)x.MarketingTypeId) == MarketingTypeId);
    }
}