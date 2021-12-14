
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Quartz;
using Volo.Abp.BackgroundWorkers.Quartz;

namespace BnByachts.BackgroundWorker
{
    public class MyLogWorker : QuartzBackgroundWorkerBase
    {

        private readonly IScheduler _scheduler;

       
        public MyLogWorker(IScheduler scheduler)
        {
                _scheduler = scheduler;
                JobDetail = JobBuilder.Create<MyLogWorker>().WithIdentity(nameof(MyLogWorker)).Build();
                Trigger = TriggerBuilder.Create().WithIdentity(nameof(MyLogWorker)).WithSimpleSchedule(s => s.WithIntervalInMinutes(1).RepeatForever().WithMisfireHandlingInstructionIgnoreMisfires()).Build();
                _scheduler.ScheduleJob(JobDetail, Trigger);
        }

        public override Task Execute(IJobExecutionContext context)
        {
            Logger.LogInformation("Executed MyLogWorker..!");
            return Task.CompletedTask;
        }
    }
}
