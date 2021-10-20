using BnBYachts.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace BnBYachts
{
    [DependsOn(
        typeof(BnBYachtsEntityFrameworkCoreTestModule)
        )]
    public class BnBYachtsDomainTestModule : AbpModule
    {

    }
}