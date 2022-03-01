
using BnBYachts.Core.Interface;
using BnBYachts.Core.ServiceProvider.Interface;
using BnBYachts.Core.ServiceProvider.Requestable;
using BnBYachts.Core.ServiceProvider.Transferable;
using BnBYachts.Core.Shared.Constants;
using BnBYachts.Shared.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Core.Services.ServiceProvider
{
    [Authorize]
    public class ServiceProviderAppService :ApplicationService ,IServiceProviderAppService
    {
        private readonly IServiceProviderManager _serviceproviderManager;
        private readonly IS3FileService _s3Service;
        public ServiceProviderAppService(IServiceProviderManager serviceproviderManager, IS3FileService s3Service)
        {
            _serviceproviderManager = serviceproviderManager;
            _s3Service = s3Service;

        }
        public async Task<EntityResponseModel> CreateonBoarding(IFormCollection formdata)
        {
           
                var data = JsonConvert.DeserializeObject<ServiceProviderRequestableDto>(formdata["seviceproviderdata"]);
                data.UserId = CurrentUser.Id.ToString();
                var response = await _serviceproviderManager.CreateonBoarding(data).ConfigureAwait(false);
                if (response.ReturnStatus && !string.IsNullOrEmpty(data.SupportiveDoc) && formdata.Files.Count > 0)
                {
                    await _s3Service.UploadFileToAWSAsync(formdata.Files.FirstOrDefault(x => x.Name == FileTypeConstants.Pdf), "serviceprovider", "supportdocument");
                }
                if (response.ReturnStatus && !string.IsNullOrEmpty(data.CompanyProfilePicture) && formdata.Files.Count > 0)

                {
                    await _s3Service.UploadFileToAWSAsync(formdata.Files.FirstOrDefault(x => x.Name == FileTypeConstants.Image), "serviceprovider", "companyprofile");
                }
                return  response;
        }
        public async Task<EntityResponseListModel<ServiceProviderTransferable>> SearchServiceProvider(ServiceProviderSearchRequestable request)=>
            await _serviceproviderManager.SearchServiceProvider(request).ConfigureAwait(false);
        public async Task<EntityResponseModel> GetServiceProviderById(int id)=>
        await _serviceproviderManager.GetServiceProviderDetailsById(id).ConfigureAwait(false);
        public async Task<bool> isServiceProviderExist(ServiceProviderTypeCheckRequestable request)
        {
            request.UserId = CurrentUser.Id.ToString();
            return await _serviceproviderManager.isServiceProviderExist(request).ConfigureAwait(false);
        }


        }
    }
