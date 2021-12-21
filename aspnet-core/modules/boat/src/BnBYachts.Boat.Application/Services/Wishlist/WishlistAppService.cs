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
        public async Task<EntityResponseModel> AddToWishlist(int boatId) => await _manager.AddToWishlist(boatId, CurrentUser.Id ?? Guid.NewGuid());

        public async Task<EntityResponseListModel<WishlistTransferableDto>> GetUserWishlist() => await _manager.GetUserWishlist(CurrentUser.Id);
        public async Task<EntityResponseModel> RemoveToWishlist(int id) => await _manager.RemoveToWishlist(id);
    }
}
