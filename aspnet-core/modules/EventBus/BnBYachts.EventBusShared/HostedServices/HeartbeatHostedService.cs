using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using Microsoft.Extensions.Hosting;
using Volo.Abp.EventBus.Distributed;

namespace BnBYachts.EventBusShared.HostedServices
{
    public class HeartbeatHostedService : BackgroundService
    {
        private readonly IDistributedEventBus _distributedEventBus;
        public HeartbeatHostedService(IDistributedEventBus distributedEventBus)
        {
            _distributedEventBus = distributedEventBus;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await Task.Delay(30000, stoppingToken);
                try
                {
                    await _distributedEventBus.PublishAsync(
                        new AppHeartbeatContract{ Message = "cool"}
                          );
                }
                catch (System.Exception e)
                {

                    throw;
                }
            }
        }
    }
}
