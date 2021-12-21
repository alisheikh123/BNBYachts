using BnBYachts.Boat.Wishlist.Transferable;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Boat.Wishlist.Interface
{
   public interface IWishlistManager
    {
        Task<EntityResponseModel> AddToWishlist(int boatId, Guid userId);
        Task<EntityResponseListModel<WishlistTransferableDto>> GetUserWishlist(Guid? userId);
        Task<EntityResponseModel> RemoveToWishlist(int id);
    }
}
