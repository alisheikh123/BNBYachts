using BnBYachts.Core.NewsLetters.Interface;
using Microsoft.Extensions.Logging;
using Quartz;
using System;
using System.Threading.Tasks;
using Volo.Abp.BackgroundWorkers.Quartz;

namespace BnByachts.BackgroundWorker.Jobs
{
    public class ScheduleEmailWorker : QuartzBackgroundWorkerBase
    {
        private readonly INewsLetterManager _manager;
        public ScheduleEmailWorker(INewsLetterManager manager)
        {
            _manager = manager;
            JobDetail = JobBuilder.Create<ScheduleEmailWorker>().WithIdentity(nameof(ScheduleEmailWorker)).Build();
            Trigger = TriggerBuilder.Create().WithIdentity(nameof(ScheduleEmailWorker))
                .WithSimpleSchedule(s => s.WithIntervalInMinutes(1).RepeatForever()
                .WithMisfireHandlingInstructionIgnoreMisfires()).Build();
            ScheduleJob = async scheduler =>
            {
                if (!await scheduler.CheckExists(JobDetail.Key))
                    {
                    await scheduler.ScheduleJob(JobDetail, Trigger);
                }
            };
        }

        public override async Task Execute(IJobExecutionContext context)
        {
            Console.WriteLine("Executed ScheduleEmailWorker..!");
            await _manager.SendEmailToSubscriberUsers();
            Logger.LogInformation("Executed ScheduleEmailWorker..!");
        }
    }

}
