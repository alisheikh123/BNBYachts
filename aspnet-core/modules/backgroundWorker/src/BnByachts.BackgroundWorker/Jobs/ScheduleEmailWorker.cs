using BnBYachts.Core.NewsLetters.Interface;
using Microsoft.Extensions.Logging;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.BackgroundWorkers.Quartz;

namespace BnByachts.BackgroundWorker.Jobs
{
    public class ScheduleEmailWorker : QuartzBackgroundWorkerBase
    {
        //private readonly INewsLetterManager _manager;
        //INewsLetterManager manager
        public ScheduleEmailWorker()
        {
            //_manager = manager;
            JobDetail = JobBuilder.Create<ScheduleEmailWorker>().WithIdentity(nameof(ScheduleEmailWorker)).Build();
            Trigger = TriggerBuilder.Create().WithIdentity(nameof(ScheduleEmailWorker))
                .WithSimpleSchedule(s => s.WithIntervalInSeconds(5).RepeatForever()
                .WithMisfireHandlingInstructionIgnoreMisfires()).Build();
            ScheduleJob = async scheduler =>
            {
                if (!await scheduler.CheckExists(JobDetail.Key))
                {
                    await scheduler.ScheduleJob(JobDetail, Trigger);
                }
            };
        }

        public override async Task<Task> Execute(IJobExecutionContext context)
        {
            //await _manager.SendEmailToSubscriberUsers();
            Logger.LogInformation("Executed ScheduleEmailWorker..!");
            Console.WriteLine("Executed ScheduleEmailWorker..!");
            return Task.CompletedTask;
        }
    }

}
