﻿using AutoMapper;
using BnBYachts.Booking.Booking;
using BnBYachts.Booking.Booking.Transferables;
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
            CreateMap<BoatelBookingEntity, BoatelBookingDto>();
            CreateMap<BookingReviewEntity, ReviewTransferable>();
            CreateMap<BoatelBookingEntity, BookingRequestsDto>();
            CreateMap<BookingReviewEntity, BookingReviewsDto>();
            CreateMap<CharterBookingEntity, BookingRequestsDto>();
            CreateMap<EventBookingEntity, BookingReviewsDto>();
        }
    }
}
