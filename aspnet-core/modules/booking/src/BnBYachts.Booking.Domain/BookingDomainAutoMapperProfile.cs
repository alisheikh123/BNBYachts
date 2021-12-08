using AutoMapper;
using BnBYachts.Booking.DTO;
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
        }
    }
}
