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
            Console.WriteLine("Starting EventBus Listener");
            await _busControl.StartAsync(cancellationToken).ConfigureAwait(false);
        }

        public async Task Stop(CancellationToken cancellationToken = default)
        {
            Logger.LogInformation("stop EventBus Listener");
            Console.WriteLine("stop EventBus Listener");
            await _busControl.StopAsync(cancellationToken).ConfigureAwait(false);
        }
    }
}
