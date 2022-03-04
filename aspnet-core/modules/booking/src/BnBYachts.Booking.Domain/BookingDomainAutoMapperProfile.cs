using AutoMapper;
using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Requestable;
using BnBYachts.Booking.Booking.Requestable.Charter;
using BnBYachts.Booking.Booking.Transferables;
using BnBYachts.Booking.Contracts;
using BnBYachts.Booking.Disputes;
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
            CreateMap<BoatelBookingEntity, BoatelBookingTransferableDto>();
            CreateMap<BookingReviewEntity, ReviewTransferable>();
            CreateMap<BookingDisputeEntity, DisputeTransferable>();
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
            CreateMap<CharterBookingEntity, CharterBookingRequestable>().ReverseMap();
            CreateMap<BookingCancellationRequestableDto, BookingCancelEntity>().ReverseMap();
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
                .ForMember(res => res.DisputeReason, opt => opt.MapFrom(res => res.ReasonId));
            CreateMap<ContractsRequestable, ContractEntity>();
            CreateMap<ContractAttachmentRequestable, ContractTermsEntity>();
            CreateMap<ContractEntity, ContractsTransferable>();
            CreateMap<ContractTermsEntity, ContractTermsTransferable>();
            CreateMap<ContractEntity, CharterBookingTransferableDto>()
                 .ForMember(x => x.ContractId, opt => opt.MapFrom(source => (source.Id)))
                 .ForMember(x => x.IsContract, opt => opt.MapFrom(source => (true)))
                   .ForMember(x => x.NoOfAdults, opt => opt.MapFrom(source => (source.NoOfGuests)))
                   .ForMember(x => x.HostId, opt => opt.MapFrom(source => (source.CreatorId)))
                   .ForMember(x => x.BookingStatus, opt => opt.MapFrom(source => (BookingStatus.Approved)));
            CreateMap<ContractEntity, EventBookingTransferableDto>()
        .ForMember(x => x.ContractId, opt => opt.MapFrom(source => (source.Id)))
        .ForMember(x => x.EventDate, opt => opt.MapFrom(source => (source.EventDateTime)))
        .ForMember(x => x.HostId, opt => opt.MapFrom(source => (source.CreatorId)))
                         .ForMember(x => x.IsContract, opt => opt.MapFrom(source => (true)))
        .ForMember(x => x.BookingStatus, opt => opt.MapFrom(source => (BookingStatus.Approved)));
            CreateMap<ContractEntity, BookingRequestsRequestableDto>()
     .ForMember(x => x.ContractId, opt => opt.MapFrom(source => (source.Id)))
     .ForMember(x => x.IsContract, opt => opt.MapFrom(source => (true)))
       .ForMember(x => x.NoOfAdults, opt => opt.MapFrom(source => (source.NoOfGuests)))
       .ForMember(x => x.HostId, opt => opt.MapFrom(source => (source.CreatorId)))
       .ForMember(x => x.BookingStatus, opt => opt.MapFrom(source => (BookingStatus.Approved)))
        .ForMember(x => x.ContractId, opt => opt.MapFrom(source => (source.Id)))
        .ForMember(x => x.EventDate, opt => opt.MapFrom(source => (source.EventDateTime)))
        .ForMember(x => x.HostId, opt => opt.MapFrom(source => (source.CreatorId)))
                         .ForMember(x => x.IsContract, opt => opt.MapFrom(source => (true)))
        .ForMember(x => x.BookingStatus, opt => opt.MapFrom(source => (BookingStatus.Approved)));
            CreateMap<BoatelBookingEntity, UnPaidBookingsTransferable>()
        .ForMember(x => x.BookingId, opt => opt.MapFrom(source => (source.Id)))
                .ForMember(x => x.BookingType, opt => opt.MapFrom(source => (BookingType.Boatel)));
            CreateMap<CharterBookingEntity, UnPaidBookingsTransferable>()
          .ForMember(x => x.BookingId, opt => opt.MapFrom(source => (source.Id)))
            .ForMember(x => x.BookingType, opt => opt.MapFrom(source => (BookingType.Charter)));
            CreateMap<EventBookingEntity, UnPaidBookingsTransferable>()
        .ForMember(x => x.BookingId, opt => opt.MapFrom(source => (source.Id)))
            .ForMember(x => x.BookingType, opt => opt.MapFrom(source => (BookingType.Event)));
            CreateMap<BookingDisputeEntity, DisputeTransferable>();
            CreateMap<EventBookingRequestableDto, EventBookingEntity>().ReverseMap();
            CreateMap<EventBookingRequestableDto, EventBookingEntity>().ReverseMap();
            CreateMap<BookingRefundableRequestable, BookingRefundableEntity>().ReverseMap();
        }
    }
}
