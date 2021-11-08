using System;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp;

namespace BnByachts.Simulator
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var application = AbpApplicationFactory.Create<SimulatorModule>(options =>
            {
                options.UseAutofac();
            }))
            {
                application.Initialize();

                //var messagingService = application
                //    .ServiceProvider
                //    .GetRequiredService<App2MessagingService>();

                //await messagingService.RunAsync();

                application.Shutdown();
            }
        }
    }
}
