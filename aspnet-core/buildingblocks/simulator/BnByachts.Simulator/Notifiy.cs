using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using Volo.Abp.DependencyInjection;

namespace BnByachts.Simulator
{
   public class Notifiy : ITransientDependency
    {

        private readonly EventBusDispatcher _eventBusDispatcher;

        public Notifiy(EventBusDispatcher eventBusDispatcher)
        {
            _eventBusDispatcher = eventBusDispatcher;
        }
        public void pushEmail()
        {
            Console.WriteLine("email sending");

            _eventBusDispatcher.Publish<IHostBoatContract>(new HostBoatContract
            {
                Name = "my Boat",
                Length = 200,
                TotalBedrooms = 2,
                TotalWashrooms = 3,
                IsBoatelServicesOffered = true,
                BoatelAvailabilityDays = 20,
                CheckinTime = new DateTime(),
                CheckoutTime = new DateTime().AddDays(3),
                Latitude = 32.073978,
                Longitude = 72.686073,
                PerDayCharges = 200,
                IsActive = true,
                BoatType = 1
            });

            //_eventBusDispatcher.Publish<IEmailContract>(new EmailContract
            //  {

            //      To = "umar.draz@techverx.com",
            //      Subject = "test",
            //      Body = new StringBuilder().Append("test")
            //  });
        }
    }
}
