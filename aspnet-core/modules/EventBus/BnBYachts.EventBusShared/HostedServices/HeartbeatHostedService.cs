using System;
using System.Threading;
using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using Microsoft.Extensions.Hosting;

namespace BnBYachts.EventBusShared.HostedServices
{
    
    public class HeartbeatHostedService : BackgroundService
    {
        private readonly EventBusDispatcher _eventBusDispatcher;

        public HeartbeatHostedService(EventBusDispatcher eventBusDispatcher)
        {
            _eventBusDispatcher = eventBusDispatcher;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                   await _eventBusDispatcher.Send<IHeartbeatContract>(new HeartbeatContract
                    {
                        Message = "ping ..."
                    }, stoppingToken).ConfigureAwait(false);
                    await Task.Delay(90000, stoppingToken);
            }
        }
    }
}





