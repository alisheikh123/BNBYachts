using System;
using System.Collections.Generic;

using System.Threading.Tasks;
using BnBYachts.EventBusShared.Contracts;
using BnByachts.SharedModule;
using MassTransit;
using Volo.Abp.Identity;
using BnBYachts.Boat.Shared.Boat.Interface;
using BnBYachts.Boat.Shared.Boat.Requestable;

namespace BnByachts.SeedObservable.Consumers
{
   public class BoatHostConsumer :IConsumer<IHostBoatContract>
    {
       private readonly IHostBoatManager _hostBoatManager;
        public BoatHostConsumer(IHostBoatManager hostBoatManager)
        {
            _hostBoatManager = hostBoatManager;
        }
        public async Task Consume(ConsumeContext<IHostBoatContract> context)
        {
            try
            {   
                var response = await _hostBoatManager.Insert(new HostBoatRequestable());
            }
            catch (Exception e)
            {                
            }
            await Task.CompletedTask;
        }
    }
}
