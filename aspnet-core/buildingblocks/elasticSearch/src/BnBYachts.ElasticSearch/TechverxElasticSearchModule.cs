
using BnBYachts.ElasticSearch.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;

namespace BnBYachts.ElasticSearch
{
    public class TechverxElasticSearchModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.Configure<ElasticSearchConfiguration>(context.Services.GetConfiguration().GetSection("ElasticSearch"));
        }
    }
}
