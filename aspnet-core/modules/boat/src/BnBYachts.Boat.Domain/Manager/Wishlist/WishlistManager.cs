using BnBYachts.Boat.Wishlist.Interface;
using BnBYachts.Boat.Wishlist.Transferable;
using BnBYachts.Boat.Wishlists;
using BnBYachts.Shared.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.ObjectMapping;

namespace BnBYachts.Boat.Manager.Wishlist
{
    public class WishlistManager : DomainService, IWishlistManager
    {
        private readonly IRepository<WishlistEntity, int> _wishlistRepository;
        private readonly IRepository<BoatEntity, int> _boatRepository;
        private readonly IObjectMapper<BoatDomainModule> _objectMapper;
        public WishlistManager(IRepository<WishlistEntity, int> wishlistRepository, IObjectMapper<BoatDomainModule> objectMapper, IRepository<BoatEntity, int> boatRepository)
        {
            _wishlistRepository = wishlistRepository;
            _objectMapper = objectMapper;
            _boatRepository = boatRepository;
        }
        public async Task<EntityResponseModel> AddToWishlist(int boatId,Guid userId)
        {
            var response = new EntityResponseModel();
            var result = await _wishlistRepository.InsertAsync(new WishlistEntity { BoatId = boatId, UserId = userId, CreatorId = userId, CreationTime = DateTime.Now }, true).ConfigureAwait(false);
            response.ReturnStatus = result.Id > 0 ? true : false;
            response.Data = result.Id;
            return response;
        }

        public async  Task<EntityResponseListModel<WishlistTransferableDto>> GetUserWishlist(Guid? userId)
        {
            var result = new EntityResponseListModel<WishlistTransferableDto>();
            var wishlistsEntity = await _wishlistRepository.GetListAsync(res => res.UserId == userId).ConfigureAwait(false);
            foreach (var wishlist in wishlistsEntity)
            {
                await _wishlistRepository.EnsurePropertyLoadedAsync(wishlist, res => res.Boat).ConfigureAwait(false);
                await _boatRepository.EnsureCollectionLoadedAsync(wishlist.Boat, res => res.BoatGalleries).ConfigureAwait(false);
            }
            result.Data = _objectMapper.Map<List<WishlistEntity>,List<WishlistTransferableDto>>(wishlistsEntity);
            result.Errors = null;
            result.ReturnStatus = true;
            return result;
        }

        public async Task<EntityResponseModel> RemoveToWishlist(int id)
        {
            var response = new EntityResponseModel();
            var wishlist = await _wishlistRepository.GetAsync(res => res.Id == id).ConfigureAwait(false);
            await _wishlistRepository.DeleteAsync(wishlist, true).ConfigureAwait(false);
            response.ReturnStatus = true;
            return response;

        }
    }
}
