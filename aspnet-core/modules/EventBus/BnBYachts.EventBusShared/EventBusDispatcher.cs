using BnBYachts.EventBusShared.Contracts;
using MassTransit;
using Volo.Abp.Domain.Services;

namespace BnBYachts.EventBusShared
{
    public class EventBusDispatcher : DomainService
    {
        private readonly IBusControl eventBus;

        public EventBusDispatcher(IBusControl eventBus)
        {
            this.eventBus = eventBus;
        }


        public void Send<T>(T contract)
            where T : class, IContractable
        {
            this.eventBus.Send<T>(contract).ConfigureAwait(false);
        }


        public void Publish<T>(T contract)
            where T : class, IContractable
        {
            this.eventBus.Publish<T>(contract).ConfigureAwait(false);
        }

    }
}
