using System;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using Microsoft.Extensions.Hosting;
using Volo.Abp.Uow;

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
                Console.WriteLine("ping...");
                    _eventBusDispatcher.Send<IHeartbeatContract>(new HeartbeatContract
                    {
                        Message = "ping ..."
                    });
                    await Task.Delay(90000, stoppingToken);
            }
        }
    }
}





