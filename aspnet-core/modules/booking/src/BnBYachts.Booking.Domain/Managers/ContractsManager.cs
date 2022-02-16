using BnBYachts.Booking.Contracts;
using BnBYachts.Booking.Contracts.Interfaces;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.ObjectMapping;

namespace BnBYachts.Booking.Managers
{
    public class ContractsManager : DomainService, IContractsManager
    {
        private readonly IRepository<ContractEntity, int> _repo;
        private readonly IRepository<ContractTermsEntity, int> _repoContactsTerms;
        private readonly IObjectMapper<BookingDomainModule> _objectMapper;

        public ContractsManager(IRepository<ContractEntity, int> repo, IRepository<ContractTermsEntity, int> repoContactsTerms, IObjectMapper<BookingDomainModule> objectMapper)
        {
            _repo = repo;
            _repoContactsTerms = repoContactsTerms;
            _objectMapper = objectMapper;
        }
        public async Task<EntityResponseModel> AddContract(ContractsRequestable contractData, List<ContractAttachmentRequestable> attachmentData)
        {
            var contract = await _repo.InsertAsync(_objectMapper.Map<ContractsRequestable, ContractEntity>(contractData), true).ConfigureAwait(false);
            attachmentData.ForEach((f) => f.ContractEntityId = contract.Id);
            await _repoContactsTerms.InsertManyAsync(_objectMapper.Map<ICollection<ContractAttachmentRequestable>, ICollection<ContractTermsEntity>>(attachmentData)).ConfigureAwait(false);
            return new EntityResponseModel
            {
                ReturnStatus = true
            };
        }

        public async Task<EntityResponseListModel<ContractsTransferable>> GetContracts(ContractListRequestable data, Guid? userId)
        {
                var response = new EntityResponseListModel<ContractsTransferable>();
                var contracts = _objectMapper.Map<ICollection<ContractEntity>, ICollection<ContractsTransferable>>(
                    await _repo.GetListAsync(res => (data.isHost == true ? res.CreatorId == userId : res.UserId == userId.ToString())).ConfigureAwait(false)).ToList();
                contracts = contracts.WhereIf(data.BoatId > 0, res => res.BoatId == data.BoatId)
                     .WhereIf(data.ServiceType > 0, res => (int)(res.ServiceType) == data.ServiceType)
                    //.WhereIf(data.StatusId > 0, res => (int)(res.Status) == data.StatusId)
                    .WhereIf(data.Month > 0 && data.Year > 0 && data.ServiceType == (int)ServiceType.Charter, res => res.DepartureDate.Value.Month == data.Month && res.DepartureDate.Value.Year == data.Year)
                    .ToList();
                response.Data = await PagedList<ContractsTransferable>.CreateAsync(contracts, data.Page, data.PageSize).ConfigureAwait(false);
                response.TotalCount = contracts.Count();
                return response;
        }
        public async Task<EntityResponseModel> GetContractById(int contractId)
        {
            var response = new EntityResponseModel();
            var contract = await _repo.GetAsync(res => res.Id == contractId).ConfigureAwait(false);
            await _repo.EnsureCollectionLoadedAsync(contract, con => con.ContractTerms).ConfigureAwait(false);
            response.Data = _objectMapper.Map<ContractEntity, ContractsTransferable>(contract);

            return response;
        }
        public async Task<EntityResponseModel> RejectContract(int contractId, string reason, Guid? userId)
        {
            var response = new EntityResponseModel();
            var contract = await _repo.GetAsync(res => res.Id == contractId).ConfigureAwait(false);
            contract.Status = ContractsStatus.Rejected;
            contract.LastModifierId = userId;
            contract.RejectionReason = reason;
            response.ReturnStatus= true;
            return response;
        }

        public async Task<EntityResponseModel> AcceptContract(int contractId,Guid? userId)
        {
            var response = new EntityResponseModel();
            var contract = await _repo.GetAsync(res => res.Id == contractId).ConfigureAwait(false);
            contract.Status = ContractsStatus.Approved;
            contract.LastModifierId = userId;
            response.ReturnStatus = true;
            return response;
        }

        public async Task<EntityResponseModel> EditContract(ContractsRequestable contractData, List<ContractAttachmentRequestable> attachmentData)
        {
            var contractEntity = await _repo.GetAsync(res => res.Id == contractData.Id).ConfigureAwait(false);
            _objectMapper.Map<ContractsRequestable, ContractEntity>(contractData, contractEntity);
            await _repo.UpdateAsync(contractEntity,true).ConfigureAwait(false);
            attachmentData.ForEach((f) => f.ContractEntityId = contractEntity.Id);
            await _repoContactsTerms.InsertManyAsync(_objectMapper.Map<ICollection<ContractAttachmentRequestable>, ICollection<ContractTermsEntity>>(attachmentData)).ConfigureAwait(false);
            return new EntityResponseModel
            {
                ReturnStatus = true
            };
        }
    }
}
