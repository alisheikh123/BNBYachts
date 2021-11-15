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
                try
                {
                    await Task.Delay(30000, stoppingToken);

                    _eventBusDispatcher.Send<IHeartbeatContract>(new HeartbeatContract
                    {
                        Message = "ping ..."
                    });
                }
                catch (System.Exception e)
                {

                    throw;
                }
            }
        }
    }
}





