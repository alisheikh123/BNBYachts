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
        Task<EntityResponseModel> AddToWishlist(int id,int wishlistType, Guid userId);
        Task<EntityResponseListModel<WishlistTransferableDto>> GetUserWishlist(int wishlistType,Guid? userId);
        Task<EntityResponseModel> RemoveToWishlist(int id,int wishlistType);
    }
}
