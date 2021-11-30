using BnBYachts.EventBusShared.Contracts;
using MassTransit;
using Volo.Abp.Domain.Services;

namespace BnBYachts.EventBusShared
{
    public class EventBusDispatcher : DomainService
    {
        private readonly IBusControl _eventBus;

        public EventBusDispatcher(IBusControl eventBus)
        {
            this._eventBus = eventBus;
        }


        public void Send<T>(T contract)
            where T : class, IContractable
        {
            this._eventBus.Send<T>(contract).ConfigureAwait(false);
        }


        public void Publish<T>(T contract)
            where T : class, IContractable
        {
            this._eventBus.Publish<T>(contract).ConfigureAwait(false);
        }

    }
}
