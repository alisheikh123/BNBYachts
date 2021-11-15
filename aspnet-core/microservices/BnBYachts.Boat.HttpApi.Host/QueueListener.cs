using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MassTransit;
using Volo.Abp.Domain.Services;

namespace BnBYachts.Boat
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
