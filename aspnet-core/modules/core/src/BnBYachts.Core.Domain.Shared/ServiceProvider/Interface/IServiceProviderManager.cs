using BnBYachts.Core.Requestable;
using BnBYachts.Core.ServiceProvider.Requestable;
using BnBYachts.Core.ServiceProvider.Transferable;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Core.ServiceProvider.Interface
{
    public interface IServiceProviderManager
    {
        Task<EntityResponseModel> CreateonBoarding(ServiceProviderRequestableDto request);
        Task<List<ServiceProviderTransferable>> SearchServiceProvider(ServiceProviderSearchRequestable request);
        Task<EntityResponseModel> GetServiceProviderDetailsById(int id);

    }
}
