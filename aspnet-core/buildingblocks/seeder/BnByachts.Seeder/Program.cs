using System;
using System.Threading;
using BnByachts.Seeder;
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

            using var application = AbpApplicationFactory.Create<SeederModule>(options =>
            {

            });
            application.Initialize();
            using (var serviceScope = application.ServiceProvider.CreateScope())
            {
                
                serviceScope.ServiceProvider.GetService<BoatSeederService>()?.MigrateAsync().GetAwaiter();
            }
            Console.WriteLine("Seeder is active");
            Console.WriteLine("Ctrl + C to Quit");

            QuitEvent.WaitOne();
        }
    }
}