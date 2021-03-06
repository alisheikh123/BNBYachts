using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Contracts.Interfaces
{
    public interface IContractsManager
    {
        Task<EntityResponseModel> AddContract(ContractsRequestable contractData, List<ContractAttachmentRequestable> attachmentData);
        Task<EntityResponseListModel<ContractsTransferable>> GetContracts(ContractListRequestable data, Guid? userId);
        Task<EntityResponseModel> GetContractById(int contractId);
        Task<EntityResponseModel> RejectContract(int contractId, string reason, Guid? userId);
        Task<EntityResponseModel> AcceptContract(int contractId, Guid? userId);
        Task<EntityResponseModel> EditContract(ContractsRequestable contractData, List<ContractAttachmentRequestable> attachmentData);
        Task<EntityResponseListModel<ContractsTransferable>> GetContractsServiceProvider(ContractListRequestable data, Guid? userId);
        Task<EntityResponseModel> GetContractsBoats(int serviceProviderId, Guid? userId);
    }    
}
