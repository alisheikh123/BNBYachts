using BnBYachts.Booking.Interfaces;
using BnBYachts.Booking.Review;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.Identity;
using Volo.Abp.ObjectMapping;
using Volo.Abp.Uow;

namespace BnBYachts.Booking.Managers
{
    public class ReviewManager : DomainService, IReviewManager
    {
        private readonly IRepository<BookingReviewEntity, int> _reviewRepository;
        private readonly IObjectMapper<BookingDomainModule> _objectMapper;
        public ReviewManager(IObjectMapper<BookingDomainModule> objectMapper, IRepository<BookingReviewEntity, int> reviewRepository)
        {
            _objectMapper = objectMapper;
            _reviewRepository = reviewRepository;
        }
        public async Task<bool> AddReview(BookingReviewRequestable review)
        {
            var reviewEntity = _objectMapper.Map<BookingReviewRequestable, BookingReviewEntity>(review);
            var res = await _reviewRepository.InsertAsync(reviewEntity, true).ConfigureAwait(false);
            return res.Id > 0 ? true : false;
        }

        public async Task<ICollection<ReviewTransferable>> GetReviews(int revieweeId, bool isAllReview, string userId)
        {
            var reviews = await _reviewRepository.GetListAsync(res => res.boatId == revieweeId && (isAllReview ? true : res.ReviewerId == userId)).ConfigureAwait(false);
            return _objectMapper.Map<ICollection<BookingReviewEntity>, ICollection<ReviewTransferable>>(reviews);
        }
        public async Task<ICollection<ReviewTransferable>> GetBookingReviews(int bookingId)
        {
            var reviews = await _reviewRepository.GetListAsync(res => res.BookingId == bookingId).ConfigureAwait(false);
            return _objectMapper.Map<ICollection<BookingReviewEntity>, ICollection<ReviewTransferable>>(reviews);
        }
        public async Task<ICollection<ReviewTransferable>> GetBoatReviews(int boatId, int reviewSorting)
        {
            var reviews = await _reviewRepository.GetListAsync(res => res.boatId == boatId).ConfigureAwait(false);
            var data = _objectMapper.Map<ICollection<BookingReviewEntity>, ICollection<ReviewTransferable>>(reviews);
            if (reviewSorting == 0)
                data = data.OrderByDescending(x => x.CreationTime).ToList();
            else
                data = data.OrderBy(x => x.CreationTime).ToList();
            return data;
        }
        public async Task<bool> IsReviewAlreadyPosted(string userId, int bookingId)
        {
            var reviews = await _reviewRepository.GetListAsync(x => x.BookingId == bookingId && x.ReviewerId == userId).ConfigureAwait(false);
            return reviews.Count > 0 ? true : false;
        }
        public async Task<List<ReviewTransferable>> GetReviewsByRevieweeId(string RevieweeId) =>
                      _objectMapper.Map<List<BookingReviewEntity>, List<ReviewTransferable>>(await _reviewRepository.GetListAsync(x => x.RevieweeId == RevieweeId).ConfigureAwait(false));
    }
}
