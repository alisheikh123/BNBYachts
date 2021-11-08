﻿using System;
using BnBYachts.EventBusShared.Contracts;
using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EventBus.Distributed;

namespace BnByachts.Simulator.Handler
{
    public class HeartBeatHandler
        : IDistributedEventHandler<AppHeartbeatContract>,
            ITransientDependency
    {
        public async Task HandleEventAsync(AppHeartbeatContract eventData)
        {
            Console.WriteLine(eventData.Message);
            await Task.CompletedTask;
        }
    }
}

