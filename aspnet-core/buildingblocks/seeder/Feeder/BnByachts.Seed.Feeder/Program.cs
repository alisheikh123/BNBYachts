using System;
using System.Threading;
using BnByachts.SeedObservable.Queue;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp;

namespace BnByachts.SeedObservable
{
    public class Program
    {
        private static readonly ManualResetEvent QuitEvent = new ManualResetEvent(false);
        static void Main(string[] args)
        {
            Console.CancelKeyPress += (sender, eArgs) =>
            {
                QuitEvent.Set();
                eArgs.Cancel = true;
            };

            using var application = AbpApplicationFactory.Create<SeederObservableModule>(options =>
            {
                options.UseAutofac();
                

            });
            application.Initialize();
            using (var serviceScope = application.ServiceProvider.CreateScope())
            {
                serviceScope.ServiceProvider.GetService<QueueListener>()?.Start();
            }
            Console.WriteLine("Seeder Queue activate");
            Console.WriteLine("Ctrl + C to Quit");

            QuitEvent.WaitOne();
        }
    }
}
