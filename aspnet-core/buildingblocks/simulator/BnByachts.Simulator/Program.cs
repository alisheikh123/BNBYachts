using System;
using System.Threading;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp;

namespace BnByachts.Simulator
{

    class Program
    {
        private static readonly ManualResetEvent QuitEvent = new ManualResetEvent(false);
        static void Main(string[] args)
        {
            Console.CancelKeyPress += (sender, eArgs) =>
            {
                QuitEvent.Set();
                eArgs.Cancel = true;
            };

            using var application = AbpApplicationFactory.Create<SimulatorModule>(options =>
            {
                options.UseAutofac();
                
            });
            application.Initialize();
            using (var serviceScope = application.ServiceProvider.CreateScope())
            {
                serviceScope.ServiceProvider.GetService<QueueListener>()?.Start();
            }
            Console.WriteLine("heartbeat");
            Console.WriteLine("Ctrl + C to Quit");
            
            QuitEvent.WaitOne();
        }
    }
}
