
using BnBYachts.Booking.Booking.Event;
using BnBYachts.Booking.Booking.Interfaces.Event;
using BnBYachts.Booking.DTO;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using BnBYachts.Shared.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BnBYachts.Booking.Services.Event
{
    public class EventBookingService : ApplicationService, IEventBookingService
    {
        private readonly EventBusDispatcher _eventBusDispatcher;
        private readonly IConfiguration _config;
        private readonly IEventBookingManager _eventBookingManager;
        public EventBookingService(IEventBookingManager eventBookingManager, EventBusDispatcher eventBusDispatcher, IConfiguration config)
        {
            _eventBookingManager = eventBookingManager;
            _eventBusDispatcher = eventBusDispatcher;
            _config = config;
        }
        public async Task<EntityResponseModel> GetEventBookingDetailById(long eventBookingId)
        {
            return await _eventBookingManager.EventBookingDetailById(eventBookingId);
        }
        public async Task CancelEventBooking(BookingCancellationRequestableDto eventBookingCancellationRequestable)
        {

            eventBookingCancellationRequestable.UserId = CurrentUser.Id.ToString();
            await _eventBookingManager.CancelEventBooking(eventBookingCancellationRequestable);
            string body = $"<h4>Hello {CurrentUser.Name} </h4> <div> Your charter has successfully cancelled against this Booking Id: {eventBookingCancellationRequestable.BookingId} and" +
                $" your will received Your Amount: {eventBookingCancellationRequestable.RefundAmount} </div><br>Best Regard";
            await _eventBusDispatcher.Publish<IEmailContract>(new EmailContract
            {
                From = _config.GetSection("EmailConfiguration:Sender").Value,
                To = CurrentUser.Email.ToString(),
                Subject = "Charter Booking Cancellation",
                Body = new StringBuilder().Append(body),
                IsBodyHtml = true
            });
        }


        [HttpGet]
        public async Task<EntityResponseModel> BookingCancelDetail(long bookingId) 
        {
            return await _eventBookingManager.BookingCancelDetail(bookingId);        
        
        }
    }
}
