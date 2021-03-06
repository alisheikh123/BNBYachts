using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BnBYachts.EventBusShared;
using BnBYachts.EventBusShared.Contracts;
using BnByachts.Simulator.socket;
using Volo.Abp.DependencyInjection;
using BnBYachts.ElasticSearch;
using Nest;
using Volo.Abp.Application.Dtos;

namespace BnByachts.Simulator
{
   public class Notifiy : ITransientDependency
   {

        //private readonly ITechverxElasticSearch _techverxElasticSearch;
        // public Notifiy(ITechverxElasticSearch techverxElasticSearch)
        // {
        //     _techverxElasticSearch = techverxElasticSearch;
        // }

        private readonly EventBusDispatcher _eventBusDispatcher;

        public Notifiy(EventBusDispatcher eventBusDispatcher)
        {
            _eventBusDispatcher = eventBusDispatcher;
        }


        public void pushEmail()
        {
            // var response=_techverxElasticSearch.CrateIndexAsync("test1").GetAwaiter();

            //var response1= _techverxElasticSearch.AddOrUpdateAsync<temp, int>("test1", new temp
            // {
            //     Id = 3,
            //     Name = "testing"

            // }).GetAwaiter();
            //var searchDescriptor = new SearchDescriptor<temp>()
            //    .From(0)
            //    .Size(20);

            // var res=_techverxElasticSearch.SearchAsync<temp, int>("test1", searchDescriptor, 0,10).GetAwaiter().GetResult();
            //Console.WriteLine("email sending");

            //_ = _eventBusDispatcher.Publish<IS3FileContract>(new S3FileContract
            //{
            //   ChildFolder = "",
            //   File = null,
            //   SubFolder = ""
            //});
            _ = _eventBusDispatcher.Publish<INotificationContract>(new NotificationContract
            {
                Message = "Umar Test",
                //cd7d68fb-f11d-a1a7-1ee2-3a011cc4ec72
                UserTo = "9ff8e9ba-dce5-7bb8-4ef4-3a02f800efa8",
                Title = "test umar",
                Description = "no ",
                NotificationType = (NotificationType)1,
            });

            //var temp= new SignalRClient();
            //temp.SendMessage().GetAwaiter();
        }
    }
    
}
