using BnBYachts.Booking.Interfaces;
using BnBYachts.Booking.Review;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.ObjectMapping;

namespace BnBYachts.Booking.Managers
{
    public class ReviewManager : DomainService, IReviewManager
    {
        private readonly IObjectMapper<BookingDomainModule> _objectMapper;
        private readonly IRepository<BookingReviewEntity, int> _reviewRepository;
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

        public async Task<ICollection<ReviewTransferable>> GetReviews(int revieweeId, bool isAllReview,string userId)
        {
            var reviews = await _reviewRepository.GetListAsync(res => res.RevieweeID == revieweeId && (isAllReview ? true : res.ReviewerId == userId)).ConfigureAwait(false);
            return _objectMapper.Map<ICollection<BookingReviewEntity>, ICollection<ReviewTransferable>>(reviews);
        }
    }
}
