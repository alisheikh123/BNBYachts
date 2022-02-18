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
            string body = $"<h4>Hello {CurrentUser.Name} </h4> <div> Your charter has successfully cancelled against this Booking Id: {charterBookingCancellationRequestable.BookingId} and" +
                $" your will received Your Amount: {charterBookingCancellationRequestable.RefundAmount} </div><br>Best Regard";
            await _eventBusDispatcher.Publish<IEmailContract>(new EmailContract
            {
                From = _config.GetSection("EmailConfiguration:Sender").Value,
                To = CurrentUser.Email.ToString(),
                Subject = "Charter Booking Cancellation",
                Body = new StringBuilder().Append(body),
                IsBodyHtml = true
            });
        }
            

        
    }
}
