using BnBYachts.Boat.Wishlist.Enum;
using BnBYachts.Boat.Wishlist.Interface;
using BnBYachts.Boat.Wishlist.Transferable;
using BnBYachts.Boat.Wishlists;
using BnBYachts.Boats.Charter;
using BnBYachts.Events;
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
        private readonly IRepository<WishlistBoatEntity, int> _wishlistBoatRepository;
        private readonly IRepository<WishlistCharterEntity, int> _wishlistCharterRepository;
        private readonly IRepository<WishlistEventEntity, int> _wishlistEventRepository;
        private readonly IRepository<BoatEntity, int> _boatRepository;
        private readonly IRepository<CharterEntity, int> _charterRepository;
        private readonly IRepository<EventEntity, int> _eventRepository;
        private readonly IObjectMapper<BoatDomainModule> _objectMapper;
        public WishlistManager(IRepository<WishlistBoatEntity, int> wishlistBoatRepository,
            IRepository<WishlistCharterEntity, int> wishlistCharterRepository,
            IRepository<WishlistEventEntity, int> wishlistEventRepository,
            IRepository<CharterEntity, int> charterRepository,
            IRepository<EventEntity, int> eventRepository,
            IObjectMapper<BoatDomainModule> objectMapper, IRepository<BoatEntity, int> boatRepository)
        {
            _wishlistBoatRepository = wishlistBoatRepository;
            _wishlistCharterRepository = wishlistCharterRepository;
            _wishlistEventRepository = wishlistEventRepository;
            _objectMapper = objectMapper;
            _boatRepository = boatRepository;
            _charterRepository = charterRepository;
            _eventRepository = eventRepository;
        }
        public async Task<EntityResponseModel> AddToWishlist(int id,int wishlistType,Guid userId)
        {
            var response = new EntityResponseModel();
            if(wishlistType == (int)WishlistType.Boatel)
            {
                var result = await _wishlistBoatRepository.InsertAsync(new WishlistBoatEntity { BoatId = id, UserId = userId, CreatorId = userId, CreationTime = DateTime.Now }, true).ConfigureAwait(false);
                response.ReturnStatus = result.Id > 0 ? true : false;
                response.Data = result.Id;
            }
            else if (wishlistType == (int)WishlistType.Charter)
            {
                var result = await _wishlistCharterRepository.InsertAsync(new WishlistCharterEntity { CharterId = id, UserId = userId, CreatorId = userId, CreationTime = DateTime.Now }, true).ConfigureAwait(false);
                response.ReturnStatus = result.Id > 0 ? true : false;
                response.Data = result.Id;
            }
            else if (wishlistType == (int)WishlistType.Event)
            {
                var result = await _wishlistEventRepository.InsertAsync(new WishlistEventEntity { EventId = id, UserId = userId, CreatorId = userId, CreationTime = DateTime.Now }, true).ConfigureAwait(false);
                response.ReturnStatus = result.Id > 0 ? true : false;
                response.Data = result.Id;
            }
            return response;
        }

        public async  Task<EntityResponseListModel<WishlistTransferableDto>> GetUserWishlist(int wishlistType,Guid? userId)
        {
            var result = new EntityResponseListModel<WishlistTransferableDto>();
            if (wishlistType == (int)WishlistType.Boatel)
            {
                var wishlistsEntity = await _wishlistBoatRepository.GetListAsync(res => res.UserId == userId).ConfigureAwait(false);
                foreach (var wishlist in wishlistsEntity)
                {
                    await _wishlistBoatRepository.EnsurePropertyLoadedAsync(wishlist, res => res.Boat).ConfigureAwait(false);
                    await _boatRepository.EnsureCollectionLoadedAsync(wishlist.Boat, res => res.BoatGalleries).ConfigureAwait(false);
                }
                result.Data = _objectMapper.Map<List<WishlistBoatEntity>, List<WishlistTransferableDto>>(wishlistsEntity); 
            }
            else if (wishlistType == (int)WishlistType.Charter)
            {
                var wishlistsEntity = await _wishlistCharterRepository.GetListAsync(res => res.UserId == userId).ConfigureAwait(false);
                foreach (var wishlist in wishlistsEntity)
                {
                    await _wishlistCharterRepository.EnsurePropertyLoadedAsync(wishlist, res => res.Charter).ConfigureAwait(false);
                    await _charterRepository.EnsurePropertyLoadedAsync(wishlist.Charter, res => res.Boat).ConfigureAwait(false);
                    await _boatRepository.EnsureCollectionLoadedAsync(wishlist.Charter.Boat, res => res.BoatGalleries).ConfigureAwait(false);
                }
                result.Data = _objectMapper.Map<List<WishlistCharterEntity>, List<WishlistTransferableDto>>(wishlistsEntity);
            }
            if (wishlistType == (int)WishlistType.Event)
            {
                var wishlistsEntity = await _wishlistEventRepository.GetListAsync(res => res.UserId == userId).ConfigureAwait(false);
                foreach (var wishlist in wishlistsEntity)
                {
                    await _wishlistEventRepository.EnsurePropertyLoadedAsync(wishlist, res => res.Event).ConfigureAwait(false);
                    await _eventRepository.EnsurePropertyLoadedAsync(wishlist.Event, res => res.Boat).ConfigureAwait(false);
                    await _boatRepository.EnsureCollectionLoadedAsync(wishlist.Event.Boat, res => res.BoatGalleries).ConfigureAwait(false);
                }
                result.Data = _objectMapper.Map<List<WishlistEventEntity>, List<WishlistTransferableDto>>(wishlistsEntity);
            }
            result.Errors = null;
            result.ReturnStatus = true;
            return result;
        }

        public async Task<EntityResponseModel> RemoveToWishlist(int id,int wishlistType)
        {
            var response = new EntityResponseModel();
            if (wishlistType == (int)WishlistType.Boatel)
            {
                var wishlist = await _wishlistBoatRepository.GetAsync(res => res.Id == id).ConfigureAwait(false);
                await _wishlistBoatRepository.DeleteAsync(wishlist, true).ConfigureAwait(false);
                response.ReturnStatus = true; 
            }
            else if (wishlistType == (int)WishlistType.Charter)
            {
                var wishlist = await _wishlistCharterRepository.GetAsync(res => res.Id == id).ConfigureAwait(false);
                await _wishlistCharterRepository.DeleteAsync(wishlist, true).ConfigureAwait(false);
                response.ReturnStatus = true;
            }
            else if (wishlistType == (int)WishlistType.Event)
            {
                var wishlist = await _wishlistEventRepository.GetAsync(res => res.Id == id).ConfigureAwait(false);
                await _wishlistEventRepository.DeleteAsync(wishlist, true).ConfigureAwait(false);
                response.ReturnStatus = true;
            }
            return response;
        }
    }
}
