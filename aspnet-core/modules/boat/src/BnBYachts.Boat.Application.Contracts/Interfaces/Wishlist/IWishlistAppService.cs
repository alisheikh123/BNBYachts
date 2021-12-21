using BnBYachts.Boat.Wishlist.Transferable;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Interfaces.Wishlist
{
   public interface IWishlistAppService
    {
        Task<EntityResponseModel> AddToWishlist(int boatId);
        Task<EntityResponseListModel<WishlistTransferableDto>> GetUserWishlist();
        Task<EntityResponseModel> RemoveToWishlist(int Id);
    }
}
