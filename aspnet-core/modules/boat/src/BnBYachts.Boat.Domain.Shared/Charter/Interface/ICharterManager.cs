
using BnBYachts.Boat.Boat.Transferables;
using BnBYachts.Boat.Charter.Dto;
using BnBYachts.Boat.Shared.Boat.Requestable;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BnBYachts.Charter.Interface
{
    public interface ICharterManager
    {
        Task<ICollection<BoatDTO>> BoatList(Guid? userId);
        Task<ICollection<CharterDto>> BookedCharter(int boatId);
        Task<CharterDto> InsertCharter(CharterDto charterForm);
        Task<EntityResponseListModel<CharterDto>> GetCharters(Guid? userId,int pageNo,int pageSize);
        Task<bool> UpdateCharter(ChartersMapperRequestable charterDetails,Guid? userId);
        Task<bool> UpdateCharterStatus(long charterId);
        Task<bool> UpdateCharterLocation(CharterLocationRequestable charterDetails, Guid? userId);
        Task<EntityResponseModel> GetCharterDetailById(long charterId);
        Task<EntityResponseListModel<CharterDto>> GetChartersByBoatId(int boatId);
    }
}
