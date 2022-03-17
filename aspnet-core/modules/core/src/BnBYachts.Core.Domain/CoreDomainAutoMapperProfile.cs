using AutoMapper;
using BnBYachts.Core.Admin.Transferable;
using BnBYachts.Core.Data.Entities;
using BnBYachts.Core.Requestable;
using BnBYachts.Core.Data.Model.VerifyPhoneNumber;
using BnBYachts.Core.Shared.Requestable;
using Volo.Abp.Identity;
using BnBYachts.Core.ServiceProvider.Requestable;
using BnBYachts.Core.Data.Entities.ServiceProvider;
using BnBYachts.Core.ServiceProvider.Transferable;
using BnBYachts.Core.Enum;
using BnBYachts.Core.Shared.Transferable;

namespace BnBYachts.Core
{
    public class CoreDomainAutoMapperProfile: Profile
    {
        public CoreDomainAutoMapperProfile()
        {
            CreateMap<UserRequestable, IdentityUser>();
            CreateMap<IdentityRole, RolesTransferable>();
            CreateMap<IdentityUser, BoatUserTransferable>();
            CreateMap<UserMobileVerificationRequestable, OTPVerifierEntity>().
                ForMember(source=>source.PhoneNumber,destination=>destination.MapFrom(source=> source.Phone));
            CreateMap<OTPVerifierEntity, UserMobileVerificationRequestable>().
                ForMember(source => source.Phone, destination => destination.MapFrom(source => source.PhoneNumber));
            CreateMap<FrequentQuestionEntity, FrequentQuestionsDto>().ReverseMap();
            CreateMap<TimeSlotRequestableDto, TimeSlotEntity>();
            CreateMap<ServiceProviderRequestableDto, ServiceProviderEntity>();
            CreateMap<TimeSlotEntity, TimeSlotTransferable>();
            CreateMap<ServiceProviderEntity, ServiceProviderTransferable>()
                .ForMember(source => source.PaymentType, destination => destination.MapFrom(source => (source.PaymentOption.HasValue && source.PaymentOption.Value > 0) ? (source.PaymentOption == CaptainPaymentType.PerHour) ? "Per Hour" : "Per Day" : ""));
        }
    }
}
