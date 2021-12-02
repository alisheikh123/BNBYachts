using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace BnBYachts.Core
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            Console.WriteLine("3.9");
            services.AddApplication<CoreHttpApiHostModule>();

            services.AddAbpIdentity().AddDefaultTokenProviders();

            Console.WriteLine("done");
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            Console.WriteLine("4");
            app.InitializeApplication();
            Console.WriteLine("end");
        }
    }
}
