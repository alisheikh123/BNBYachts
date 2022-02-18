using BnBYachts.Booking.Contracts;
using BnBYachts.Shared.Model;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Interface
{
    public interface IContractsAppService
    {
        Task<EntityResponseModel> AddContract(IFormCollection data, IFormFileCollection files);
        Task<EntityResponseListModel<ContractsTransferable>> GetContracts(ContractListRequestable data);
        Task<EntityResponseModel> GetContractById(int contractId);
        Task<EntityResponseModel> RejectContract(int contractId,string reason);
        Task<EntityResponseModel> AcceptContract(int contractId);
        Task<EntityResponseModel> EditContract(IFormCollection data, IFormFileCollection files);

    }
}
