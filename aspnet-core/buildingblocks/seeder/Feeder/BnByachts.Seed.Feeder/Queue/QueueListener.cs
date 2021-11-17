using MassTransit;
using Microsoft.Extensions.Logging;
using Volo.Abp.Domain.Services;

namespace BnByachts.SeedObservable.Queue
{
    public class QueueListener : DomainService
    {
        private readonly IBusControl _busControl;


        public QueueListener(IBusControl busControl)
        {
            _busControl = busControl;

        }
        public void Start()
        {

            Logger.LogDebug($"Starting ScheduleRule EventBus Listener ");
            _busControl.StartAsync().Wait();
        }

        public void Stop()
        {
            Logger.LogDebug("Stoping ScheduleRule EventBus Listener");
            _busControl.Stop();
        }
    }
}

