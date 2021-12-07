﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using BnByachts.Simulator.socket;
using Volo.Abp.DependencyInjection;

namespace BnByachts.Simulator
{
   public class Notifiy : ITransientDependency
    {

        private readonly EventBusDispatcher _eventBusDispatcher;

        public Notifiy(EventBusDispatcher eventBusDispatcher)
        {
            _eventBusDispatcher = eventBusDispatcher;
        }
        public void pushEmail()
        {

            new SignalRClient().SendMessage();
            //Console.WriteLine("email sending");

            //_ = _eventBusDispatcher.Publish<IEmailContract>(new EmailContract
            //{
            //    To = "umar.draz@techverx.com",
            //    Subject = "test",
            //    Body = new StringBuilder().Append("test")
            //});
        }
    }
}
