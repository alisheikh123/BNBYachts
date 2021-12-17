using AutoMapper;
using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.Booking.Review;

namespace BnBYachts.Booking
{
    public class BookingDomainAutoMapperProfile : Profile
    {
        public BookingDomainAutoMapperProfile()
        {
            /* You can configure your AutoMapper mapping configuration here.
             * Alternatively, you can split your mapping configurations
             * into multiple profile classes for a better organization. */
            CreateMap<BookingReviewRequestable, BookingReviewEntity>();
            CreateMap<BoatelBookingEntity, BoatelBookingTransferableDto>();
            CreateMap<BookingReviewEntity, ReviewTransferable>();
            CreateMap<BoatelBookingEntity, BookingRequestsRequestableDto>();
            CreateMap<BookingReviewEntity, BookingReviewsTransferableDto>();
            CreateMap<CharterBookingEntity, BookingRequestsRequestableDto>();
            CreateMap<EventBookingEntity, BookingReviewsTransferableDto>();
            CreateMap<CharterBookingRequestableDto, CharterBookingEntity>();
            CreateMap<BoatelBookingTransferableDto, BoatelBookingEntity>();
            CreateMap<CharterBookingRequestableDto, CharterBookingEntity>();
            CreateMap<BoatelBookingRequestableDto, BoatelBookingEntity>();
        }
    }
}
