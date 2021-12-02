using System.Threading;
using System.Threading.Tasks;
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
            _eventBus = eventBus;
        }
        public async Task Send<T>(T contract, CancellationToken cancellationToken = default)
            where T : class, IContractable
        {
            await _eventBus.Send<T>(contract, cancellationToken).ConfigureAwait(false);
        }
        public async Task Publish<T>(T contract, CancellationToken cancellationToken = default)
            where T : class, IContractable
        {
            await _eventBus.Publish<T>(contract, cancellationToken).ConfigureAwait(false);
        }

    }
}
