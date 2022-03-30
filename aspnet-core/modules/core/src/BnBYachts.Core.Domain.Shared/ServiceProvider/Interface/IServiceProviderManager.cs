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
        Task<EntityResponseListModel<ServiceProviderTransferable>> SearchServiceProvider(ServiceProviderSearchRequestable request);
        Task<EntityResponseModel> GetServiceProviderDetailsById(int id);
        Task<bool> isServiceProviderExist(ServiceProviderTypeCheckRequestable request);
        Task<EntityResponseModel> AlreadyServiceProvider(ServiceProviderTypeCheckRequestable request);
        Task<EntityResponseModel> GetServiceProvidersList();
        Task<EntityResponseModel> SuspendServiceProvider(long id);
        Task<EntityResponseModel> GetServiceProviderByUserId(string userId);
    }
}
