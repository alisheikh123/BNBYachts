using MassTransit;
using Volo.Abp.Domain.Services;

namespace BnByachts.Simulator
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
            _busControl.StartAsync().Wait();
        }

        public void Stop()
        {
            _busControl.Stop();
        }
    }
}
