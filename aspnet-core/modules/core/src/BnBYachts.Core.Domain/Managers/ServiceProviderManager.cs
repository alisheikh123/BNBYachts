using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using BnBYachts.Shared.Model;
using Microsoft.Extensions.Logging;
using Volo.Abp.Uow;
using BnBYachts.Core.Data.Entities.ServiceProvider;
using Volo.Abp.ObjectMapping;
using BnBYachts.Core.ServiceProvider.Transferable;
using BnBYachts.Core.ServiceProvider.Interface;
using BnBYachts.Core.ServiceProvider.Requestable;
using Volo.Abp.Users;
using BnBYachts.Core.Shared.Constants;
using BnBYachts.Core.Enum;

namespace BnBYachts.Core.Managers
{
    public class ServiceProviderManager : DomainService, IServiceProviderManager
    {
        private readonly IObjectMapper<CoreDomainModule> _objectMapper;
        private readonly ILogger<IServiceProviderManager> _logger;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        private readonly IRepository<ServiceProviderEntity, int> _servicerepository;
        private readonly AppUserManager _appUserManager;
        public ServiceProviderManager(IRepository<ServiceProviderEntity, int> servicerepository,
            IObjectMapper<CoreDomainModule> objectMapper,
            ILogger<IServiceProviderManager> logger,
            IUnitOfWorkManager unitOfWorkManager,
             AppUserManager appUserManager)
        {
            _servicerepository = servicerepository;
            _objectMapper = objectMapper;
            _logger = logger;
            _unitOfWorkManager = unitOfWorkManager;
            _appUserManager = appUserManager;
        }

        public async Task<EntityResponseModel> CreateonBoarding(ServiceProviderRequestableDto request)
        {
            var response = new EntityResponseModel();
              await _servicerepository.InsertAsync(_objectMapper.Map<ServiceProviderRequestableDto, ServiceProviderEntity>(request), true).ConfigureAwait(false);
            _logger.LogInformation("Service Provider Added Successfully");
            return response;

        }

        public async Task<EntityResponseListModel<ServiceProviderTransferable>> SearchServiceProvider(ServiceProviderSearchRequestable request)
        {
            var response = new EntityResponseListModel<ServiceProviderTransferable>();
            var res = await _servicerepository.GetListAsync(x => x.ServiceProviderType == request.ServiceProviderType).ConfigureAwait(false);
            res = res.WhereIf(request.AvaliableDate != null && request.ServiceProviderType==ServiceProviderType.Captain, x => x.FromDate.Value.Date >= request.AvaliableDate.Value.Date).ToList();
            res = res.WhereIf(!string.IsNullOrEmpty(request.Location), x => x.Location.Equals(request.Location)).ToList();
            foreach (var timeslot in res)          
                await _servicerepository.EnsureCollectionLoadedAsync(timeslot, x => x.TimeSlots).ConfigureAwait(false);           
            var result = _objectMapper.Map<List<ServiceProviderEntity>, List<ServiceProviderTransferable>>(res);
            foreach (var user in result)
            {
                var userInfo = await _appUserManager.GetUserDetailsById(user.UserId).ConfigureAwait(false);
                user.UserName = userInfo.Name;
                user.UserImagePath = userInfo.ImagePath;
            }
            response.Data = result;
            _logger.LogInformation("Search Service Provider Executed Successfully");
            return response;

        }
        public async Task<EntityResponseModel> GetServiceProviderDetailsById(int id)
        {
           var  response = new EntityResponseModel();
            var res = await _servicerepository.GetAsync(x => x.Id==id).ConfigureAwait(false);         
              await _servicerepository.EnsureCollectionLoadedAsync(res, x => x.TimeSlots).ConfigureAwait(false);           
            var result = _objectMapper.Map<ServiceProviderEntity, ServiceProviderTransferable>(res);
                var userInfo = await _appUserManager.GetUserDetailsById(result.UserId).ConfigureAwait(false);
                result.UserName = userInfo.Name;
                result.UserImagePath = userInfo.ImagePath;
            response.Data = result;
            _logger.LogInformation("Service Provider Details Fetched Successfully");
            return response;
        }
        public async Task<bool> isServiceProviderExist(ServiceProviderTypeCheckRequestable request )
        {
            if (request == null) return false;
           var check=   await _servicerepository.FirstOrDefaultAsync(x => x.UserId == request.UserId &&  x.ServiceProviderType== request.ServiceProviderType).ConfigureAwait(false);
           return check != null ? true : false;
        }
        public async Task<EntityResponseModel> AlreadyServiceProvider(ServiceProviderTypeCheckRequestable request)
        {       
            var checkserviceprovider = await _servicerepository.FirstOrDefaultAsync(x => x.UserId == request.UserId && x.ServiceProviderType != request.ServiceProviderType).ConfigureAwait(false);
            var rolechecked = await _appUserManager.RoleVerify(request.UserId,  new string[] { RoleConstants.AdminRoleName, RoleConstants.SuperAdminRoleName });
            if (checkserviceprovider != null && !rolechecked) return new EntityResponseModel();
            else return new EntityResponseModel { ReturnStatus = false };
        }
    }

   
}
