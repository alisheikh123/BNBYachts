﻿using BnBYachts.Booking.Review;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BnBYachts.Booking.Interfaces
{
    public interface IReviewManager
    {
        Task<ICollection<ReviewTransferable>> GetReviews(int revieweeId,bool isAllReview,string userId);
        Task<bool> AddReview(BookingReviewRequestable review);
        Task<ICollection<ReviewTransferable>> GetBookingReviews(int bookingId);
        Task<bool> IsReviewAlreadyPosted(string userId,int bookingId);
    }
}