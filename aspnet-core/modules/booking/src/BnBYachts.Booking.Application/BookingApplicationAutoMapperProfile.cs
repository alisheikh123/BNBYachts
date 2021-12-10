using AutoMapper;
using BnBYachts.Booking.DTO;
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
            CreateMap<BoatelBookingEntity, BoatelBookingDto>();
            CreateMap<BookingReviewEntity, ReviewTransferable>();
        }
    }
}
