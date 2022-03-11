using System;
using System.Threading;
using BnByachts.BackgroundWorker;
using BnByachts.BackgroundWorker.Jobs;
using BnBYachts.EventBusShared.Queue;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp;

namespace BnByachts.BackgroundWorker
{
    public class Program
    {
        private static readonly ManualResetEvent QuitEvent = new ManualResetEvent(false);
        public static void Main(string[] args)
        {
            Console.CancelKeyPress += (sender, eArgs) =>
            {
                QuitEvent.Set();
                eArgs.Cancel = true;
            };

            using var application = AbpApplicationFactory.Create<BackgroundWorkerModule>(options =>
            {
                options.UseAutofac();
            });
            application.Initialize();
            using (var serviceScope = application.ServiceProvider.CreateScope())
            {
                serviceScope.ServiceProvider.GetService<QueueListener>()?.Start().GetAwaiter();
            }
            Console.WriteLine("Background Worker is Running");
            Console.WriteLine("Ctrl + C to Quit");
            QuitEvent.WaitOne();
            Console.WriteLine("end");
        }
    }
}