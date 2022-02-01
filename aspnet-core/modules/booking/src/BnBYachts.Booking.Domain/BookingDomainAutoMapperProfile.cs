using AutoMapper;
using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.Booking.Disputes;
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
            CreateMap<EventBookingRequestableDto, EventBookingEntity>();
            CreateMap<BookingRequestsRequestableDto, BoatelBookingEntity>();
            CreateMap<EventBookingEntity, BookingRequestsRequestableDto>();
            CreateMap<BoatelBookingEntity, CalendarTransferable>().
                  ForMember(res => res.Id, opt => opt.MapFrom(res => res.BoatId)).
                  ForMember(res => res.BookingId, opt => opt.MapFrom(res => res.Id)).
                  ForMember(res => res.StartDate, opt => opt.MapFrom(res => res.CheckinDate))
                 .ForMember(res => res.EndDate, opt => opt.MapFrom(res => res.CheckoutDate))
                 .ForMember(res => res.Name, opt => opt.MapFrom(res => res.UserName + "- Boatel"))
                 .ForMember(x => x.ServiceType, opt => opt.MapFrom(source => (BookingType.Boatel)));
            CreateMap<CharterBookingEntity, CalendarTransferable>().
                   ForMember(res => res.Id, opt => opt.MapFrom(res => res.CharterId)).
                   ForMember(res => res.BookingId, opt => opt.MapFrom(res => res.Id))
                  .ForMember(res => res.StartDate, opt => opt.MapFrom(res => res.DepartureDate))
                  .ForMember(res => res.EndDate, opt => opt.MapFrom(res => res.ArrivalDate))
                  .ForMember(res => res.Name, opt => opt.MapFrom(res => res.UserName + "- Charter"))
                  .ForMember(x => x.ServiceType, opt => opt.MapFrom(source => (BookingType.Charter)));
            CreateMap<EventBookingEntity, CalendarTransferable>().
                   ForMember(res => res.Id, opt => opt.MapFrom(res => res.EventId)).
                   ForMember(res => res.BookingId, opt => opt.MapFrom(res => res.Id))
                  .ForMember(res => res.StartDate, opt => opt.MapFrom(res => res.EventDate))
                  .ForMember(res => res.EndDate, opt => opt.MapFrom(res => res.EventDate))
                  .ForMember(res => res.Name, opt => opt.MapFrom(res => res.UserName + "- Event"))
                  .ForMember(x => x.ServiceType, opt => opt.MapFrom(source => (BookingType.Event)));
            CreateMap<BoatelBookingEntity, BookingsLookupDto>()
                  .ForMember(x => x.BookingType, opt => opt.MapFrom(source => (BookingType.Boatel)))
                  .ForMember(x => x.BookingTypeId, opt => opt.MapFrom(source => source.BoatId));
            CreateMap<CharterBookingEntity, BookingsLookupDto>()
                 .ForMember(x => x.BookingType, opt => opt.MapFrom(source => (BookingType.Charter)))
                 .ForMember(x => x.BookingTypeId, opt => opt.MapFrom(source => source.CharterId));
            CreateMap<EventBookingEntity, BookingsLookupDto>()
                .ForMember(x => x.BookingType, opt => opt.MapFrom(source => (BookingType.Event)))
                .ForMember(x => x.BookingTypeId, opt => opt.MapFrom(source => source.EventId));
            CreateMap<DisputeRequestableDto, BookingDisputeEntity>()
                .ForMember(res=>res.DisputeReason,opt=>opt.MapFrom(res=>res.ReasonId));
        }
    }
}
