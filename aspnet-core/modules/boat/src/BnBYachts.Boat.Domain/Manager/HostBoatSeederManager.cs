using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using BnBYachts.Boat.Shared.Boat.Requestable;
using BnBYachts.Boat.Shared.Boat.Interface;
using BnBYachts.Boats.Charter;
using Volo.Abp.ObjectMapping;
using BnBYachts.Events;

namespace BnBYachts.Boat.Manager
{
    public class HostBoatSeederManager : DomainService, IHostBoatSeederManager
    {
        private readonly IRepository<BoatEntity, int> _boatRepository;
        private readonly IRepository<BoatFeatureEntity, int> _boatelFeatureRepo;
        private readonly IRepository<BoatRuleEntity, int> _boatelRulesRepo;
        private readonly IRepository<BoatCalendarEntity, int> _boatelCalendarRepo;
        private readonly IRepository<BoatGalleryEntity, int> _boatGalleryRepo;
        //Charters
        private readonly IRepository<CharterEntity, int> _charterRepository;
        private readonly IRepository<EventEntity, int> _eventRepository;
        //Lookups
        private readonly IRepository<RuleEntity, int> _rulesRepo;
        private readonly IRepository<FeatureEntity, int> _featuresRepo;
        private readonly IObjectMapper<BoatDomainModule> _objectMapper;


        public HostBoatSeederManager(IRepository<RuleEntity, int> rulesRepo,
            IRepository<FeatureEntity, int> featuresRepo, IRepository<BoatEntity, int> boatRepository,
            IRepository<CharterEntity, int> charterRepository, IRepository<BoatEntity, int> repository,
            IRepository<BoatFeatureEntity, int> boatelFeatureRepo, IRepository<BoatRuleEntity, int> boatelRulesRep,
            IRepository<BoatCalendarEntity, int> boatelCalendarRepo, IRepository<BoatGalleryEntity, int> boatGalleryRepo,
            IRepository<EventEntity, int> eventRepo,
            IObjectMapper<BoatDomainModule> objectMapper)
        {

            _boatRepository = repository;
            _boatelFeatureRepo = boatelFeatureRepo;
            _boatelCalendarRepo = boatelCalendarRepo;
            _boatelRulesRepo = boatelRulesRep;
            _charterRepository = charterRepository;
            _rulesRepo = rulesRepo;
            _featuresRepo = featuresRepo;
            _objectMapper = objectMapper;
            _boatGalleryRepo = boatGalleryRepo;
            _eventRepository = eventRepo;
        }
       

        public async Task<HostBoatRequestable> InsertBoat(HostBoatRequestable input)
        {
            await _boatRepository.InsertAsync(_objectMapper.Map<HostBoatRequestable, BoatEntity>(input), true);
            return new HostBoatRequestable();
        }

        public async Task<BoatCalendarRequestable> InsertBoatCalendar(BoatCalendarRequestable input)
        {
            await _boatelCalendarRepo.InsertAsync(_objectMapper.Map<BoatCalendarRequestable, BoatCalendarEntity>(input), true);
            return new BoatCalendarRequestable();
        }

        public async Task<BoatFeaturesMapperRequestable> InsertBoatFeatures(BoatFeaturesMapperRequestable input)
        {
            await _boatelFeatureRepo.InsertAsync(_objectMapper.Map<BoatFeaturesMapperRequestable, BoatFeatureEntity>(input), true);
            return new BoatFeaturesMapperRequestable();
        }

        public async Task<BoatGalleryRequestable> InsertBoatGallery(BoatGalleryRequestable input)
        {
            await _boatGalleryRepo.InsertAsync(_objectMapper.Map<BoatGalleryRequestable, BoatGalleryEntity>(input), true);
            return new BoatGalleryRequestable();
        }

        public async Task<BoatRulesMapperRequestable> InsertBoatRules(BoatRulesMapperRequestable input)
        {
            await _boatelRulesRepo.InsertAsync(_objectMapper.Map<BoatRulesMapperRequestable, BoatRuleEntity>(input), true);
            return new BoatRulesMapperRequestable();
        }

        public async Task<ChartersMapperRequestable> InsertCharters(ChartersMapperRequestable input)
        {
            await _charterRepository.InsertAsync(_objectMapper.Map<ChartersMapperRequestable, CharterEntity>(input), true);
            return new ChartersMapperRequestable();
        }

        public async Task<EventsMapperRequestable> InsertEvents(EventsMapperRequestable input)
        {
            await _eventRepository.InsertAsync(_objectMapper.Map<EventsMapperRequestable, EventEntity>(input), true);
            return new EventsMapperRequestable();
        }

        public async Task<FeaturesRequestable> InsertFeatures(FeaturesRequestable input)
        {
           
            await _featuresRepo.InsertAsync(_objectMapper.Map<FeaturesRequestable, FeatureEntity>(input), true);
            return new FeaturesRequestable();
        }

        public async Task<RulesRequestable> InsertRules(RulesRequestable input)
        {
            await _rulesRepo.InsertAsync(_objectMapper.Map<RulesRequestable, RuleEntity>(input), true);
            return new RulesRequestable();
        }
    }
}
