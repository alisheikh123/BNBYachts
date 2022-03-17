using System;
using System.Threading;
using System.Threading.Tasks;
using MassTransit;
using Microsoft.Extensions.Logging;
using Volo.Abp.Domain.Services;

namespace BnBYachts.EventBusShared.Queue
{
    public class QueueListener : DomainService
    {
        private readonly IBusControl _busControl;
        public QueueListener(IBusControl busControl)
        {
            _busControl = busControl;
        }
        public async Task Start(CancellationToken cancellationToken = default)
        {
            Logger.LogInformation($"Starting EventBus Listener");
            Console.WriteLine("Starting EventBus Listene");
            await _busControl.StartAsync().ConfigureAwait(false);
            Console.WriteLine("start");
        }

        public async Task Stop(CancellationToken cancellationToken = default)
        {
            Logger.LogInformation("stop EventBus Listener");
            await _busControl.StopAsync(cancellationToken).ConfigureAwait(false);
            Console.WriteLine("stoped");
        }
    }
}
