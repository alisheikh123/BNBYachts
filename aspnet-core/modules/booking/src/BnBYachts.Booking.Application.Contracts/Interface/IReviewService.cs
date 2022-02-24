using BnBYachts.Booking.Review;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Interface
{
   public interface IReviewService
    {
        Task<bool> AddReview(BookingReviewRequestable review);
        Task<ICollection<ReviewTransferable>> GetReviews(int revieweeId, bool isAllReview);
        Task<ICollection<ReviewTransferable>> GetBookingReviews(int bookingId);
        Task<bool> GetIfReviewAlreadyPosted(int bookingId);
        Task<ICollection<ReviewTransferable>> GetBoatReviews(int boatId, int reviewSorting);
        Task<List<ReviewTransferable>> GetReviewsByReviewerId(string ReviewerId);
    }
}
