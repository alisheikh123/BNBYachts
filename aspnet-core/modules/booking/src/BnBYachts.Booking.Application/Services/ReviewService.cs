using BnBYachts.Booking.Interface;
using BnBYachts.Booking.Interfaces;
using BnBYachts.Booking.Review;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking.Services
{
    public class ReviewService : ApplicationService, IReviewService
    {
        private readonly IReviewManager _reviewManager;
        public ReviewService(IReviewManager reviewManager)
        {
            _reviewManager = reviewManager;
        }
        public async Task<bool> AddReview(BookingReviewRequestable review)
        {
            review.ReviewerId = CurrentUser.Id.ToString();
            return await _reviewManager.AddReview(review);
        }

        public async Task<ICollection<ReviewTransferable>> GetReviews(int revieweeId, bool isAllReview) => await _reviewManager.GetReviews(revieweeId, isAllReview, CurrentUser.Id.ToString());
        public async Task<ICollection<ReviewTransferable>> GetBookingReviews(int bookingId) => await _reviewManager.GetBookingReviews(bookingId);
        public async Task<ICollection<ReviewTransferable>> GetBoatReviews(int boatId) => await _reviewManager.GetBoatReviews(boatId);
        public async Task<bool> GetIfReviewAlreadyPosted(int bookingId) => await _reviewManager.IsReviewAlreadyPosted(CurrentUser.Id.ToString(), bookingId);
    }
}
