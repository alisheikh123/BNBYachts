using BnBYachts.Booking.Contracts;
using BnBYachts.Booking.Contracts.Interfaces;
using BnBYachts.Booking.Interface;
using BnBYachts.Shared.Model;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking.Services
{
    public class ContractsAppService : ApplicationService, IContractsAppService
    {
        private readonly IS3FileUploaderService _s3Service;
        private readonly IContractsManager _manager;
        public ContractsAppService(IS3FileUploaderService s3Service, IContractsManager manager)
        {
            _s3Service = s3Service;
            _manager = manager;
        }
        public async Task<EntityResponseModel> AddContract(IFormCollection data, IFormFileCollection files)
        {
            var contractForm = JsonConvert.DeserializeObject<ContractsRequestable>(data["contractForm"]);
            contractForm.HostId = CurrentUser.Id.ToString();
            var attachmentsData = JsonConvert.DeserializeObject<List<ContractAttachmentRequestable>>(data["attachments"]); ;
            var response = await _manager.AddContract(contractForm, attachmentsData).ConfigureAwait(false);
            if (response.ReturnStatus == true)
            {
                foreach (var file in files)
                {
                    await _s3Service.UploadFileToAWSAsync(file, "ContractsAttachments", "", "");
                }
            }
            return response;
        }

        public async Task<EntityResponseModel> GetContractById(int contractId)
        => await _manager.GetContractById(contractId).ConfigureAwait(false);

        public async Task<EntityResponseListModel<ContractsTransferable>> GetContracts(ContractListRequestable data)
        => await _manager.GetContracts(data, CurrentUser.Id).ConfigureAwait(false);

        public async Task<EntityResponseModel> RejectContract(int contractId, string reason)
        => await _manager.RejectContract(contractId, reason, CurrentUser.Id).ConfigureAwait(false);
        public async Task<EntityResponseModel> AcceptContract(int contractId)
        => await _manager.AcceptContract(contractId, CurrentUser.Id).ConfigureAwait(false);

        public async Task<EntityResponseModel> EditContract(IFormCollection data, IFormFileCollection files)
        {
            var contractForm = JsonConvert.DeserializeObject<ContractsRequestable>(data["contractForm"]);
            var attachmentsData = JsonConvert.DeserializeObject<List<ContractAttachmentRequestable>>(data["attachments"]); ;
            var response = await _manager.EditContract(contractForm, attachmentsData).ConfigureAwait(false);
            if (response.ReturnStatus == true)
            {
                foreach (var file in files)
                {
                    await _s3Service.UploadFileToAWSAsync(file, "ContractsAttachments", "", "");
                }
            }
            return response;
        }
    }
}
