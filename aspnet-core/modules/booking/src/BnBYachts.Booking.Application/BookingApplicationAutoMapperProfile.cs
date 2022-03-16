using AutoMapper;
using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.Booking.Review;

namespace BnBYachts.Booking
{
    public class BookingApplicationAutoMapperProfile : Profile
    {
        public BookingApplicationAutoMapperProfile()
        {
            /* You can configure your AutoMapper mapping configuration here.
             * Alternatively, you can split your mapping configurations
             * into multiple profile classes for a better organization. */
            CreateMap<BoatelBookingEntity, Booking.Requestable.BoatelBookingRequestableDto>();
            CreateMap<BookingReviewEntity, ReviewTransferable>();
            CreateMap<BoatelBookingEntity, Booking.Requestable.BookingRequestsRequestableDto>();
            CreateMap<BookingReviewEntity, BookingReviewsTransferableDto>();
            CreateMap<CharterBookingEntity, Booking.Requestable.BookingRequestsRequestableDto>();
            CreateMap<EventBookingEntity, BookingReviewsTransferableDto>();
            CreateMap<CharterBookingEntity, CharterBookingTransferableDto>();
            CreateMap<EventBookingEntity, EventBookingTransferableDto>();
        }
    }
}
