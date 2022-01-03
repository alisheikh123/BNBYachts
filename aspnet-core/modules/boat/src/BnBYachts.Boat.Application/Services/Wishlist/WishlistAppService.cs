using BnBYachts.Boat.Interfaces.Wishlist;
using BnBYachts.Boat.Wishlist.Interface;
using BnBYachts.Boat.Wishlist.Transferable;
using BnBYachts.Shared.Model;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Boat.Services.Wishlist
{
    [Authorize]
    public class WishlistAppService : ApplicationService, IWishlistAppService
    {
        private readonly IWishlistManager _manager;
        public WishlistAppService(IWishlistManager manager)
        {
            _manager = manager;  
        }
        public async Task<EntityResponseModel> AddToWishlist(int id, int wishlistType ) => await _manager.AddToWishlist(id,wishlistType, CurrentUser.Id ?? Guid.NewGuid());

        public async Task<EntityResponseListModel<WishlistTransferableDto>> GetUserWishlist(int wishlistType) => await _manager.GetUserWishlist(wishlistType,CurrentUser.Id);
        public async Task<EntityResponseModel> RemoveToWishlist(int id,int wishlistType) => await _manager.RemoveToWishlist(id,wishlistType);
    }
}
