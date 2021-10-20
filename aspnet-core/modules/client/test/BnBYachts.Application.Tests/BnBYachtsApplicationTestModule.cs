using Volo.Abp.Modularity;

namespace BnBYachts
{
    [DependsOn(
        typeof(BnBYachtsApplicationModule),
        typeof(BnBYachtsDomainTestModule)
        )]
    public class BnBYachtsApplicationTestModule : AbpModule
    {

    }
}