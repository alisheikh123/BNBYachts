
using BnBYachts.Core.ServiceProvider.Requestable;
using BnBYachts.Core.ServiceProvider.Transferable;
using BnBYachts.Shared.Model;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Core.Interface
{
 public interface IServiceProviderService  : IApplicationService
    {
        Task<EntityResponseModel> CreateonBoarding(IFormCollection formdata);
        Task<List<ServiceProviderTransferable>> SearchServiceProvider(ServiceProviderSearchRequestable request);
        Task<EntityResponseModel> GetServiceProviderById(int id);
    }
}
