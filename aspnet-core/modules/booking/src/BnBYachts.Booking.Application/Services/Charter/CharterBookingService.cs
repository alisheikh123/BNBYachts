using BnBYachts.Booking.Booking.Charter;
using BnBYachts.Booking.Booking.Interfaces.Charter;
using BnBYachts.Booking.Booking.Requestable.Charter;
using BnBYachts.Booking.DTO;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking.Services.Charter
{
    public class CharterBookingService : ApplicationService, ICharterBookingService
    {
        private readonly ICharterBookingManager _charterBookingManager;
        private readonly EventBusDispatcher _eventBusDispatcher;
        private readonly IConfiguration _config;

        public CharterBookingService(ICharterBookingManager charterBookingManager,EventBusDispatcher eventBusDispatcher, IConfiguration config
            )
        {
            _charterBookingManager = charterBookingManager;
            _eventBusDispatcher = eventBusDispatcher;
            _config = config;
        }

        public async Task<CharterBookingRequestable> GetCharterBookingDetailById(long charterBookingId)
        {
            return await _charterBookingManager.GetCharterBookingById(charterBookingId);
        }

        public async Task CancelCharterBooking(BookingCancellationRequestableDto charterBookingCancellationRequestable)
        {
            charterBookingCancellationRequestable.UserId = CurrentUser.Id.ToString();
            await _charterBookingManager.CancelCharterBooking(charterBookingCancellationRequestable);
            await _eventBusDispatcher.Publish<IEmailContract>(new EmailContract
            {
                From = _config.GetSection("EmailConfiguration:Sender").Value,
                To = _config.GetSection("EmailConfiguration:Receiver").Value,
                Subject = _config.GetSection("EmailConfiguration:Subject").Value,
                Body = new StringBuilder().Append(_config.GetSection("EmailConfiguration:Body").Value),
                IsBodyHtml = true
            });
        }
            

        
    }
}
