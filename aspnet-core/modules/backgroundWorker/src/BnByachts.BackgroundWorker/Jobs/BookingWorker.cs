//using BnBYachts.Booking.BackgroundJobs;
//using Microsoft.Extensions.Logging;
//using Quartz;
//using System;
//using System.Threading.Tasks;
//using Volo.Abp.BackgroundWorkers.Quartz;

//namespace BnByachts.BackgroundWorker.Jobs
//{
//    public class BookingWorker : QuartzBackgroundWorkerBase
//    {
//        private readonly IScheduler _scheduler;
//        private readonly IBookingJobsManager _manager;
//        public BookingWorker(IScheduler scheduler, IBookingJobsManager manager)
//        {
//            _scheduler = scheduler;
//            _manager = manager;
//            JobDetail = JobBuilder.Create<BookingWorker>().WithIdentity(nameof(BookingWorker)).Build();
//            Trigger = TriggerBuilder.Create().WithIdentity(nameof(BookingWorker)).WithSimpleSchedule(s => s.WithIntervalInHours(5).RepeatForever().WithMisfireHandlingInstructionIgnoreMisfires()).Build();
//            _scheduler.ScheduleJob(JobDetail, Trigger);
//        }

//        public override Task Execute(IJobExecutionContext context)
//        {
//            _manager.RejectPendingBookings();
//            Logger.LogInformation("Executed BookingWorker..!");
//            Console.WriteLine("Executed BookingWorker..!");
//            return Task.CompletedTask;
//        }
//    }

}
